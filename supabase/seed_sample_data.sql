-- ============================================================
-- SAMPLE DATA (Demo loyiha va blog)
-- Bu faqat test uchun — o'z ma'lumotlaringizni Admin paneldan qo'shing!
-- ============================================================

-- Sample Projects
INSERT INTO public.projects (name, slug, info, description, img, category, tech, github, live, sort_order, for_sale, price, youtube_url) VALUES
(
  'Portfolio Website',
  'portfolio-website',
  'Modern portfolio website with admin panel',
  'Professional portfolio website built with React, Vite, and Supabase. Features include dynamic content management, blog system, project showcase, and responsive design. Admin panel allows easy content updates without code changes.',
  '/icon.png',
  'featured',
  ARRAY['React', 'Vite', 'Supabase', 'JavaScript', 'CSS'],
  'https://github.com/JalolxojayevYusufxon/portfolio',
  'https://yourwebsite.com',
  1,
  false,
  null,
  null
),
(
  'E-Commerce Platform',
  'ecommerce-platform',
  'Full-stack online store with payment integration',
  'Complete e-commerce solution with product management, shopping cart, user authentication, and payment processing. Built with modern technologies for scalability and performance.',
  '/icon.png',
  'react',
  ARRAY['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
  null,
  null,
  2,
  true,
  '$599',
  null
),
(
  'Landing Page Template',
  'landing-page-template',
  'Responsive landing page for startups',
  'Clean and modern landing page template perfect for startups and small businesses. Includes hero section, features, pricing, testimonials, and contact form. Fully responsive and SEO optimized.',
  '/icon.png',
  'static',
  ARRAY['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  null,
  'https://example.com',
  3,
  true,
  '$99',
  null
);

-- Sample Blogs
INSERT INTO public.blogs (title, slug, excerpt, content, img, published, sort_order, link) VALUES
(
  'React Best Practices 2025',
  'react-best-practices-2025',
  'Learn the latest React patterns and techniques for writing clean, maintainable code.',
  'React continues to evolve, and staying up-to-date with best practices is crucial for developers. In this post, we''ll explore modern patterns including hooks, component composition, and performance optimization.

Key topics covered:
- Custom hooks for reusable logic
- Component composition patterns
- Performance optimization with React.memo and useMemo
- State management strategies
- Testing best practices

These practices will help you write more maintainable and scalable React applications.',
  '/icon.png',
  true,
  1,
  null
),
(
  'Building Admin Panels with Supabase',
  'building-admin-panels-supabase',
  'Step-by-step guide to creating powerful admin interfaces using Supabase.',
  'Supabase provides an excellent backend solution for building admin panels. This guide walks through the process of creating a full-featured CMS with authentication, database operations, and file storage.

Topics:
- Supabase authentication setup
- Row Level Security (RLS) policies
- Storage bucket configuration
- Real-time subscriptions
- Admin UI best practices

By the end, you''ll have a fully functional admin panel that''s secure and scalable.',
  '/icon.png',
  true,
  2,
  null
),
(
  'TypeScript Tips for React Developers',
  'typescript-tips-react',
  'Improve your React apps with TypeScript: types, interfaces, and generics explained.',
  'TypeScript adds type safety to React applications, making them more robust and easier to maintain. This article covers practical TypeScript patterns specifically for React developers.

You''ll learn:
- Typing props and state
- Generic components
- Custom hooks with TypeScript
- Type guards and utility types
- Common pitfalls and solutions

Whether you''re new to TypeScript or looking to deepen your knowledge, these tips will improve your development workflow.',
  '/icon.png',
  false,
  3,
  null
);

-- Sample Site Content (Profile/Hero)
INSERT INTO public.site_content (key, value) VALUES
(
  'profile',
  '{
    "name": "Jalolxojayev Yusufxon",
    "initials": "JY",
    "role": "Frontend Developer · React · TypeScript",
    "tags": ["O''zbekiston", "Mavjud", "Remote"]
  }'::jsonb
),
(
  'hero',
  '{
    "badge": "👋 Salom!",
    "job": "Frontend Developer",
    "info": "Men zamonaviy web ilovalar yarataman. React, TypeScript va Supabase texnologiyalarida tajribam bor.",
    "projectsBtn": "Loyihalarim",
    "contactBtn": "Bog''lanish",
    "stats": [
      { "n": "1+", "l": "yil tajriba" },
      { "n": "10+", "l": "loyiha" },
      { "n": "4.7", "l": "GPA" }
    ]
  }'::jsonb
);

-- ============================================================
-- SUCCESS MESSAGE
-- ============================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Sample data yaratildi!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Qo''shildi:';
  RAISE NOTICE '   - 3 ta sample loyiha';
  RAISE NOTICE '   - 3 ta sample blog (2 published, 1 draft)';
  RAISE NOTICE '   - Profile va Hero content';
  RAISE NOTICE '';
  RAISE NOTICE '🔐 Admin panel: http://localhost:5173/admin';
  RAISE NOTICE '   Login: admin';
  RAISE NOTICE '   Parol: yusufxon2005';
  RAISE NOTICE '';
  RAISE NOTICE '📝 O''z ma''lumotlaringizni qo''shish:';
  RAISE NOTICE '   1. Admin panelga kiring';
  RAISE NOTICE '   2. Sample datani o''chiring yoki tahrirlang';
  RAISE NOTICE '   3. O''z loyihalaringizni qo''shing!';
END $$;
