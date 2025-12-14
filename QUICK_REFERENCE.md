# Multi-Language Quick Reference Card

## 🚀 Quick Start

### Use translations in any component:

```tsx
"use client";
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("common");
  return <button>{t("search")}</button>;
}
```

## 🌍 Supported Languages

| Language          | Code | URL Example                     |
| ----------------- | ---- | ------------------------------- |
| English (Default) | `en` | `http://localhost:3000`         |
| Spanish           | `es` | `http://localhost:3000?lang=es` |
| French            | `fr` | `http://localhost:3000?lang=fr` |
| German            | `de` | `http://localhost:3000?lang=de` |
| Chinese           | `zh` | `http://localhost:3000?lang=zh` |
| Swahili           | `sw` | `http://localhost:3000?lang=sw` |
| Hindi             | `hi` | `http://localhost:3000?lang=hi` |

## 📦 Translation Sections

| Section    | Use For       | Example Keys                    |
| ---------- | ------------- | ------------------------------- |
| `common`   | General UI    | search, save, cancel, loading   |
| `nav`      | Navigation    | shop, categories, deals, about  |
| `products` | Product pages | addToCart, inStock, viewDetails |
| `filters`  | Filters       | category, brand, priceRange     |
| `sort`     | Sorting       | latest, priceAsc, priceDesc     |
| `cart`     | Shopping cart | checkout, subtotal, total       |
| `auth`     | Login/Signup  | email, password, signIn         |
| `admin`    | Admin panel   | dashboard, inventory, orders    |
| `footer`   | Footer links  | aboutUs, contactUs, privacy     |

## 💡 Common Patterns

### Client Component

```tsx
"use client";
import { useTranslations } from "next-intl";

export default function Button() {
  const t = useTranslations("common");
  return <button>{t("save")}</button>;
}
```

### Server Component

```tsx
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("nav");
  return <nav>{t("shop")}</nav>;
}
```

### Multiple Sections

```tsx
"use client";
import { useTranslations } from "next-intl";

export default function ProductCard() {
  const tCommon = useTranslations("common");
  const tProducts = useTranslations("products");

  return (
    <div>
      <button>{tProducts("addToCart")}</button>
      <span>{tCommon("loading")}</span>
    </div>
  );
}
```

## ✅ What's Already Done

- ✅ All 7 language files created
- ✅ next-intl configured
- ✅ Middleware integration complete
- ✅ Provider setup done
- ✅ LanguageBox working
- ✅ Filter preservation implemented
- ✅ Example component updated (SearchForm)

## 🎯 Your Original English Text is Safe!

**Without translation hook:**

```tsx
// This will always show "Add to Cart" (original English)
export default function Button() {
  return <button>Add to Cart</button>;
}
```

**With translation hook:**

```tsx
// This will show translated text when ?lang=xx is in URL
import { useTranslations } from "next-intl";

export default function Button() {
  const t = useTranslations("products");
  return <button>{t("addToCart")}</button>;
}
```

## 🔧 Helper Utility Available

```tsx
import { productKeys } from "@/lib/translations";

const t = useTranslations("products");
<button>{t(productKeys.addToCart)}</button>; // Type-safe!
```

## 📝 Remember

- ✅ Prices DON'T translate (keep as numbers)
- ✅ Product names DON'T translate
- ✅ Brand names DON'T translate
- ✅ Only UI text translates
- ✅ Migrate components gradually
- ✅ Test each language after changes

## 🎨 Testing Checklist

```bash
# 1. Start dev server
npm run dev

# 2. Test URLs
http://localhost:3000              # English (default)
http://localhost:3000?lang=es      # Spanish
http://localhost:3000?lang=fr      # French
http://localhost:3000?lang=de      # German

# 3. Test language switching
Click LanguageBox → Select language → Verify URL updates

# 4. Test filter preservation
Apply filters → Change language → Verify filters preserved

# 5. Test SearchForm example
Visit /admin/inventory → See "Search" (or translated) in search box
```

## 📚 Full Documentation

- See `TRANSLATION_GUIDE.md` for detailed usage
- See `IMPLEMENTATION_SUMMARY.md` for complete overview
- See `messages/*.json` for all available translation keys

---

**Ready to use! Start by updating your most visible components.**
