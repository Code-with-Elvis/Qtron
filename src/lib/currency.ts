// Currency symbols mapping
const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  KES: "KES",
  NGN: "₦",
  ZAR: "R",
  GHS: "GH₵",
  TZS: "TSh",
  UGX: "USh",
  INR: "₹",
  CAD: "C$",
  AUD: "A$",
  JPY: "¥",
  CNY: "¥",
  AED: "د.إ",
  EGP: "E£",
};

// Map countries to their currencies
const countryCurrencyMap: Record<string, string> = {
  "United States": "USD",
  USA: "USD",
  Kenya: "KES",
  Nigeria: "NGN",
  "South Africa": "ZAR",
  Ghana: "GHS",
  Tanzania: "TZS",
  Uganda: "UGX",
  India: "INR",
  Canada: "CAD",
  Australia: "AUD",
  Japan: "JPY",
  China: "CNY",
  "United Kingdom": "GBP",
  UK: "GBP",
  Germany: "EUR",
  France: "EUR",
  Italy: "EUR",
  Spain: "EUR",
  Netherlands: "EUR",
  Belgium: "EUR",
  Portugal: "EUR",
  Greece: "EUR",
  Austria: "EUR",
  Ireland: "EUR",
  "United Arab Emirates": "AED",
  Egypt: "EGP",
};

// Currencies that don't use decimal places
const noDecimalCurrencies = ["JPY", "KES", "NGN", "TZS", "UGX"];

interface ExchangeRates {
  [key: string]: number;
}

let cachedRates: ExchangeRates | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

/**
 * Fetch exchange rates from a free API
 * Using exchangerate-api.com free tier (1,500 requests/month)
 */
async function fetchExchangeRates(): Promise<ExchangeRates> {
  const now = Date.now();

  // Return cached rates if still valid
  if (cachedRates && now - cacheTimestamp < CACHE_DURATION) {
    return cachedRates;
  }

  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();
    cachedRates = data.rates;
    cacheTimestamp = now;

    return data.rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    // Return default rates if API fails
    return {
      USD: 1,
      EUR: 0.92,
      GBP: 0.79,
      KES: 129.5,
      NGN: 1620,
      ZAR: 18.5,
      GHS: 15.8,
      TZS: 2650,
      UGX: 3700,
      INR: 83.2,
      CAD: 1.36,
      AUD: 1.53,
      JPY: 149.5,
      CNY: 7.24,
      AED: 3.67,
      EGP: 48.5,
    };
  }
}

/**
 * Get currency code from country name
 */
export function getCurrencyFromCountry(country: string): string {
  return countryCurrencyMap[country] || "USD";
}

/**
 * Get currency symbol from currency code
 */
export function getCurrencySymbol(currencyCode: string): string {
  return currencySymbols[currencyCode] || currencyCode;
}

/**
 * Convert USD price to target currency
 */
export async function convertPrice(
  usdPrice: number,
  targetCurrency: string
): Promise<number> {
  if (targetCurrency === "USD") {
    return usdPrice;
  }

  const rates = await fetchExchangeRates();
  const rate = rates[targetCurrency];

  if (!rate) {
    console.warn(`Exchange rate not found for ${targetCurrency}`);
    return usdPrice;
  }

  return usdPrice * rate;
}

/**
 * Format price with currency symbol and proper formatting
 */
export async function formatPrice(
  usdPrice: number,
  country: string
): Promise<string> {
  const currencyCode = getCurrencyFromCountry(country);
  const symbol = getCurrencySymbol(currencyCode);

  // If USD, just format as is
  if (currencyCode === "USD") {
    return `${symbol} ${usdPrice
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }

  // Convert price
  const convertedPrice = await convertPrice(usdPrice, currencyCode);

  // Format based on currency
  if (noDecimalCurrencies.includes(currencyCode)) {
    return `${symbol} ${Math.round(convertedPrice).toLocaleString()}`;
  }

  return `${symbol} ${convertedPrice
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

/**
 * Synchronous price formatting using cached rates (for client components)
 */
export function formatPriceSync(usdPrice: number, country: string): string {
  const currencyCode = getCurrencyFromCountry(country);
  const symbol = getCurrencySymbol(currencyCode);

  // If no cached rates or USD, return USD price
  if (!cachedRates || currencyCode === "USD") {
    return `${symbol} ${usdPrice
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }

  const rate = cachedRates[currencyCode];
  if (!rate) {
    return `${symbol} ${usdPrice
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }

  const convertedPrice = usdPrice * rate;

  // Format based on currency
  if (noDecimalCurrencies.includes(currencyCode)) {
    return `${symbol} ${Math.round(convertedPrice).toLocaleString()}`;
  }

  return `${symbol} ${convertedPrice
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

/**
 * Initialize exchange rates (call this on app load)
 */
export async function initializeExchangeRates(): Promise<void> {
  await fetchExchangeRates();
}
