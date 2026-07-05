# 🔐 Environment Configuration Guide

## Required Environment Variables

### Supabase Configuration
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**How to get these:**
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → API
4. Copy the Project URL and Anon Key
5. For Service Role Key, go to Settings → API → Service Role Secret

### Resend Email Service
```
RESEND_API_KEY=your-resend-api-key-here
ADMIN_EMAIL=admin@example.com
```

**How to get these:**
1. Go to https://resend.com
2. Sign up and create an account
3. Go to API Keys
4. Create a new API key
5. Copy the key and add it to your environment

### Application Configuration
```
VITE_APP_TITLE=جمعية حي سيدي خليفة القادري
VITE_APP_LOGO=https://your-domain.com/logo.png
JWT_SECRET=your-jwt-secret-key-here-min-32-characters
```

### Database
```
DATABASE_URL=postgresql://user:password@host:5432/database
```

This is automatically provided by Supabase. You can find it in:
- Supabase Dashboard → Settings → Database → Connection String

### Analytics (Optional)
```
VITE_ANALYTICS_ENDPOINT=https://your-analytics.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

### Node Environment
```
NODE_ENV=production
```

## Setup Steps

### 1. Create Supabase Project
1. Visit https://supabase.com
2. Click "Start your project"
3. Sign in with GitHub or Email
4. Create a new organization
5. Create a new project
6. Wait for the project to be created (2-3 minutes)

### 2. Configure Database
1. Go to SQL Editor
2. Run the migration scripts in `drizzle/migrations/`
3. Create tables for:
   - users
   - news
   - projects
   - events
   - gallery
   - documents
   - memberships
   - volunteers
   - complaints
   - board_members

### 3. Setup Resend
1. Visit https://resend.com
2. Sign up with your email
3. Verify your email
4. Go to API Keys
5. Create a new API key
6. Copy the key

### 4. Local Development
Create a `.env.local` file in the project root:

```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=your-resend-key
ADMIN_EMAIL=your-email@example.com
JWT_SECRET=your-secret-key-min-32-chars
DATABASE_URL=your-database-url
VITE_APP_TITLE=جمعية حي سيدي خليفة القادري
VITE_APP_LOGO=https://your-logo-url.png
NODE_ENV=development
```

### 5. Vercel Deployment
1. Go to https://vercel.com
2. Import your GitHub repository
3. Go to Settings → Environment Variables
4. Add all the variables from above
5. Deploy

## Security Notes

- **Never commit `.env` or `.env.local` files**
- **Never share your API keys publicly**
- **Rotate keys regularly**
- **Use different keys for development and production**
- **Keep your Supabase project private**
- **Enable Row Level Security (RLS) in Supabase**

## Troubleshooting

### "Cannot connect to Supabase"
- Check that `VITE_SUPABASE_URL` is correct
- Verify `VITE_SUPABASE_ANON_KEY` is not expired
- Make sure your Supabase project is active

### "Email service not working"
- Verify `RESEND_API_KEY` is correct
- Check that `ADMIN_EMAIL` is configured
- Make sure you've verified your email in Resend

### "Database connection failed"
- Check `DATABASE_URL` is correct
- Verify database is running
- Check network connectivity

## Support

For issues:
- Supabase: https://supabase.com/support
- Resend: https://resend.com/support
- Project: Create an issue on GitHub
