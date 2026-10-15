import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../../i18n/LanguageContext";
import { supabase } from "../../lib/supabase";
import { EMAIL, WEB3FORMS_ACCESS_KEY } from "../../lib/constants";
import Glass from "../ui/Glass";
import "../ui/Glass.css";
import "./ContactForm.css";

function ContactForm() {
  const { t } = useLang();
  const c = t.contact;
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = (data) => {
    const errors = {};
    if (!data.name || data.name.trim().length < 1) errors.name = c.errName || "Ismni kiriting";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((data.email || "").trim())) {
      errors.email = c.errEmail || "To'g'ri email kiriting";
    }
    if (!data.subject || data.subject.trim().length < 1) {
      errors.subject = c.errSubject || "Mavzuni kiriting";
    }
    if (!data.message || data.message.trim().length < 2) {
      errors.message = "Xabar kamida 2 ta belgi bo'lsin";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setStatus("idle");

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
    };

    if (!validate(payload)) {
      setStatus("error");
      setErrorMsg("Iltimos, maydonlarni to'g'ri to'ldiring");
      return;
    }

    setStatus("loading");

    try {
      let sentSuccessfully = false;

      // 1. Telegram xabarnomasini xavfsiz backend API (/api/contact) orqali yuborish
      try {
        const tgRes = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: payload.name.trim(),
            email: payload.email.trim(),
            subject: payload.subject.trim(),
            message: payload.message.trim(),
          }),
        });

        if (tgRes.ok) {
          const tgData = await tgRes.json().catch(() => ({}));
          if (tgData.success) {
            sentSuccessfully = true;
          }
        }
      } catch (tgErr) {
        console.warn("Telegram API endpoint notice:", tgErr);
      }

      // 2. Supabase bazasiga saqlash (Admin panel uchun)
      if (supabase) {
        try {
          const { error: dbErr } = await supabase.from("contact_messages").insert([
            {
              name: payload.name.trim(),
              email: payload.email.trim(),
              subject: payload.subject.trim(),
              message: payload.message.trim(),
            },
          ]);
          if (!dbErr) {
            sentSuccessfully = true;
          }
        } catch (dbE) {
          console.warn("DB save note:", dbE);
        }
      }

      // 3. FormSubmit orqali to'g'ridan-to'g'ri pochtaga yuborish va avto-javob
      try {
        const fsRes = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            "Ism": payload.name.trim(),
            "Email": payload.email.trim(),
            "Mavzu": payload.subject.trim(),
            "Xabar matni": payload.message.trim(),
            _replyto: payload.email.trim(),
            _subject: `[Portfolio] ${payload.subject.trim()} (${payload.name.trim()})`,
            _autoresponse: `Assalomu alaykum ${payload.name.trim()}! Xabaringiz muvaffaqiyatli qabul qilindi. Tez orada siz bilan bog'lanaman. Hurmat bilan, Yusufxon Jalolxojayev`,
            _template: "table",
            _captcha: "false",
          }),
        });

        if (fsRes.ok) {
          const fsData = await fsRes.json().catch(() => ({}));
          if (
            fsData.success === true ||
            fsData.success === "true" ||
            (fsData.message && fsData.message.includes("Activation"))
          ) {
            sentSuccessfully = true;
          }
        }
      } catch (fsErr) {
        console.warn("FormSubmit note:", fsErr);
      }

      // 4. Web3Forms zaxira
      if (WEB3FORMS_ACCESS_KEY) {
        try {
          const body = new FormData();
          body.append("access_key", WEB3FORMS_ACCESS_KEY);
          body.append("name", payload.name.trim());
          body.append("email", payload.email.trim());
          body.append("subject", `[Portfolio] ${payload.subject.trim()}`);
          body.append("message", payload.message.trim());
          body.append("replyto", payload.email.trim());
          body.append("from_name", payload.name.trim());
          body.append("botcheck", "");

          const w3Res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body,
          });

          if (w3Res.ok) {
            const text = await w3Res.text();
            try {
              const data = JSON.parse(text);
              if (data.success === true || data.status === "success") {
                sentSuccessfully = true;
              }
            } catch {
              sentSuccessfully = true;
            }
          }
        } catch (w3Err) {
          console.warn("Web3Forms note:", w3Err);
        }
      }

      if (!sentSuccessfully) {
        throw new Error(c.errGeneric || "Xabar yuborishda xatolik yuz berdi");
      }

      setStatus("success");
      setFieldErrors({});
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || c.errGeneric);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.tagName === "TEXTAREA") {
        if (!e.shiftKey) {
          e.preventDefault();
          handleSubmit(e);
        }
      } else if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON") {
        e.preventDefault();
        handleSubmit(e);
      }
    }
  };

  const clearError = (name) => {
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <motion.div
      className="lg-form"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Glass borderRadius={24} blur={0.55} className="lg-form">
        <form
          ref={formRef}
          className="contactForm contactForm-inner"
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          noValidate
        >
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />

          <div className="row">
            <div className="rowItem">
              <label htmlFor="contact-name">{c.name}</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={c.namePh}
                disabled={status === "loading"}
                className={fieldErrors.name ? "has-error" : ""}
                onChange={() => clearError("name")}
                required
              />
              {fieldErrors.name && (
                <span className="field-error">{fieldErrors.name}</span>
              )}
            </div>
            <div className="rowItem">
              <label htmlFor="contact-email">{c.email}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                disabled={status === "loading"}
                className={fieldErrors.email ? "has-error" : ""}
                onChange={() => clearError("email")}
                required
              />
              {fieldErrors.email && (
                <span className="field-error">{fieldErrors.email}</span>
              )}
            </div>
          </div>

          <div className="row">
            <div className="fulrowItem">
              <label htmlFor="contact-subject">{c.subject}</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder={c.subjectPh}
                disabled={status === "loading"}
                className={fieldErrors.subject ? "has-error" : ""}
                onChange={() => clearError("subject")}
                required
              />
              {fieldErrors.subject && (
                <span className="field-error">{fieldErrors.subject}</span>
              )}
            </div>
          </div>

          <div className="row">
            <div className="fulrowItem">
              <label htmlFor="contact-message">{c.message}</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder={c.messagePh}
                disabled={status === "loading"}
                className={fieldErrors.message ? "has-error" : ""}
                onChange={() => clearError("message")}
                required
              />
              {fieldErrors.message && (
                <span className="field-error">{fieldErrors.message}</span>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.div
                key="ok"
                className="form-alert form-alert-ok"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {c.success}
                <span className="form-alert-hint">{c.successHint}</span>
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                key="err"
                className="form-alert form-alert-err"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {errorMsg || c.errGeneric}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="sendBtn"
            disabled={status === "loading"}
            whileHover={status === "loading" ? undefined : { y: -1 }}
            whileTap={status === "loading" ? undefined : { scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === "loading" ? (
              <span className="send-loading">
                <span className="send-spinner" />
                {c.sending}
              </span>
            ) : (
              c.send
            )}
          </motion.button>
        </form>
      </Glass>
    </motion.div>
  );
}

export default ContactForm;
