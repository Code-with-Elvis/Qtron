# Multi-Language Implementation Guide

## Overview

Your Next.js app now supports 7 languages using next-intl with URL search parameter strategy (`?lang=xx`).

**Supported Languages:**

- English (en) - Default
- Spanish (es)
- French (fr)
- German (de)
- Chinese (zh)
- Swahili (sw)
- Hindi (hi)

## Important Notes

✅ **Your original English text remains unchanged!**

- When no `?lang=xx` parameter is present, the app uses your original hardcoded English text
- Translation files are only loaded when a language parameter is explicitly set
- This means existing components will continue to work exactly as before

## How to Use Translations in Components

### For Client Components

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("common"); // Load 'common' section from translations

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <button>{t("search")}</button>
      <p>{t("loading")}</p>
    </div>
  );
}
```

### For Server Components

```tsx
import { useTranslations } from "next-intl";

export default function MyServerComponent() {
  const t = useTranslations("products"); // Load 'products' section

  return (
    <div>
      <h2>{t("allProducts")}</h2>
      <button>{t("addToCart")}</button>
      <span>{t("inStock")}</span>
    </div>
  );
}
```

## Available Translation Sections

All translation files have these sections:

1. **common** - General UI elements (welcome, search, filter, sort, etc.)
2. **nav** - Navigation items (shop, categories, deals, etc.)
3. **products** - Product-related text (addToCart, buyNow, outOfStock, etc.)
4. **filters** - Filter options (category, brand, priceRange, etc.)
5. **sort** - Sorting options (latest, priceAsc, priceDesc, etc.)
6. **cart** - Shopping cart text (myCart, checkout, subtotal, etc.)
7. **auth** - Authentication forms (email, password, signIn, etc.)
8. **admin** - Admin panel (dashboard, orders, inventory, etc.)
9. **footer** - Footer links and text (aboutUs, contactUs, privacy, etc.)

## Example Usage by Section

### Common Section

```tsx
const t = useTranslations('common');
<button>{t('save')}</button>
<button>{t('cancel')}</button>
<span>{t('loading')}</span>
```

### Products Section

```tsx
const t = useTranslations('products');
<h1>{t('allProducts')}</h1>
<button>{t('addToCart')}</button>
<span className={stockClass}>{t('inStock')}</span>
```

### Cart Section

```tsx
const t = useTranslations('cart');
<h2>{t('myCart')}</h2>
<p>{t('emptyCart')}</p>
<button>{t('checkout')}</button>
```

### Admin Section

```tsx
const t = useTranslations('admin');
<Link href="/admin/dashboard">{t('dashboard')}</Link>
<Link href="/admin/inventory">{t('inventory')}</Link>
```

## Important: Prices Should NOT Be Translated

Prices remain in their numeric format - only the UI text changes:

```tsx
const t = useTranslations('products');

// ✅ Correct - Price stays as number, only label translates
<div>
  <span>{t('price')}: ${product.price}</span>
</div>

// ✅ Correct - Currency symbols and numbers don't translate
<p>Total: ${calculateTotal()}</p>
```

## How Language Switching Works

1. User clicks on `LanguageBox` component in header
2. Component updates URL with `?lang=xx` parameter
3. Middleware catches the request and sets `x-locale` header
4. next-intl loads corresponding translation file (`messages/xx.json`)
5. Components using `useTranslations()` render translated text

## Example: Update a Component to Support Translations

**Before (hardcoded English):**

```tsx
export default function ProductCard() {
  return (
    <div>
      <h3>{product.name}</h3>
      <button>Add to Cart</button>
      <span>In Stock</span>
    </div>
  );
}
```

**After (with translations):**

```tsx
"use client";
import { useTranslations } from "next-intl";

export default function ProductCard() {
  const t = useTranslations("products");

  return (
    <div>
      <h3>{product.name}</h3>
      <button>{t("addToCart")}</button>
      <span>{t("inStock")}</span>
    </div>
  );
}
```

## Gradual Migration Strategy

You can update components gradually:

1. **Start with high-visibility components** (header, navigation, buttons)
2. **Move to product pages** (listings, details, cart)
3. **Update admin sections** (dashboard, forms)
4. **Finish with footer and static pages**

Components without `useTranslations()` will continue showing original English text.

## Files Modified

1. ✅ `next.config.ts` - Added next-intl plugin
2. ✅ `src/middleware.ts` - Extracts lang from URL and sets header
3. ✅ `src/i18n/request.ts` - Configures next-intl with custom locale detection
4. ✅ `src/components/IntlProvider.tsx` - Provider wrapper
5. ✅ `src/app/layout.tsx` - Wraps app with IntlProvider
6. ✅ `messages/*.json` - All 7 language files created

## Testing

1. **Default (English)**: Visit `http://localhost:3000` - Original English text
2. **Spanish**: Visit `http://localhost:3000?lang=es` - Spanish translations
3. **French**: Visit `http://localhost:3000?lang=fr` - French translations
4. **German**: Visit `http://localhost:3000?lang=de` - German translations
5. **Chinese**: Visit `http://localhost:3000?lang=zh` - Chinese translations
6. **Swahili**: Visit `http://localhost:3000?lang=sw` - Swahili translations
7. **Hindi**: Visit `http://localhost:3000?lang=hi` - Hindi translations

## Next Steps

To complete the implementation:

1. Update your most-used components with `useTranslations()`
2. Test each language to ensure proper rendering
3. Add any missing translation keys as you find them
4. Consider adding translation keys for dynamic content

## Adding New Translation Keys

If you need new translations:

1. Add the key to `messages/en.json` first
2. Copy the same structure to all other language files
3. Translate the value in each language file
4. Use the key in your component: `t('yourNewKey')`

Example:

```json
// In messages/en.json
{
  "products": {
    "compareProducts": "Compare Products",
    "viewComparison": "View Comparison"
  }
}

// In your component
const t = useTranslations('products');
<button>{t('compareProducts')}</button>
```

---

**Remember**: Your original English text is safe! Components will only use translations when a `?lang=xx` parameter is present in the URL.
