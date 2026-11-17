# Supabase catalog setup

The storefront can keep using its local catalog until Supabase is configured. Once configured, it reads active products from Supabase's generated REST API; no separate Node API server is needed for this read-only catalog.

## 1. Create the tables

Create a Supabase project, open **SQL Editor**, and run [`schema.sql`](./schema.sql).

The schema allows anonymous visitors to read active products and their images. It does not allow browser clients to insert, update, or delete catalog data.

## 2. Import the current catalog

Run the import script locally with Node.js 18 or newer. Set `SUPABASE_URL` and `SUPABASE_SECRET_KEY` in the current terminal session, then run:

```powershell
node .\supabase\import-catalog.mjs
```

The secret key is only for this one-time import. Do not put it in `js/supabase-config.js`, commit it, or expose it in the browser. The script imports product details and images from `js/products.js`; it can be run again to update those records.

## 3. Connect the storefront

In the Supabase project, copy the **Project URL** and **Publishable key** (or legacy `anon` key). Put them in `js/supabase-config.js`:

```js
window.SUPABASE_CONFIG = {
  url: 'https://your-project.supabase.co',
  publishableKey: 'your-publishable-key',
};
```

The publishable key is intended for browser use, but it is safe only while row-level security stays enabled and the public policies remain read-only. Never use a secret key here.

## 4. Verify

Reload the storefront and check that products and images load from the database. If the connection fails, the catalog area shows an error rather than silently switching back to stale data. If Supabase is not configured, the existing local catalog remains available.

## 5. Enable the admin panel

After importing the catalog, open **SQL Editor** and run [`admin-access.sql`](./admin-access.sql). This adds automatic IDs for new products, an administrator allowlist, row-level policies for writes, and a transactional save function for product details and images.

To enable database-managed categories, run [`categories-migration.sql`](./categories-migration.sql) after `admin-access.sql`. It creates the categories table, seeds the four existing categories, and links products to their category without deleting existing product data. The storefront and admin category tab require this migration.

Create each administrator in **Authentication → Users** (invite or add the account), then add their account to the allowlist from SQL Editor. Replace the example email with each administrator's exact account email:

```sql
insert into public.admin_users (user_id)
select id
from auth.users
where email = 'admin@example.com'
on conflict do nothing;
```

Repeat for each administrator. Only allowlisted accounts can make catalog changes; the browser never receives a secret key. Keep public sign-ups disabled if only invited staff should be able to create accounts.

Open `admin.html` on the same site, sign in with an allowlisted account, and use the panel to create, edit, activate/deactivate, or remove products, and to create or rename categories. Categories cannot be deleted while products still use them. The panel session is kept in memory, so a page reload requires signing in again.
