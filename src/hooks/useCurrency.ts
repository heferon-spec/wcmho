import { useState, useEffect, useCallback } from "react";

export interface Currency {
  code: string;
  symbol: string;
  label: string;
}

export const currencies: Currency[] = [
  { code: "ZAR", symbol: "R", label: "South African Rand (ZAR)" },
  { code: "USD", symbol: "$", label: "US Dollar (USD)" },
  { code: "EUR", symbol: "€", label: "Euro (EUR)" },
  { code: "GBP", symbol: "£", label: "British Pound (GBP)" },
  { code: "NGN", symbol: "₦", label: "Nigerian Naira (NGN)" },
  { code: "KES", symbol: "KSh", label: "Kenyan Shilling (KES)" },
  { code: "BWP", symbol: "P", label: "Botswana Pula (BWP)" },
  { code: "INR", symbol: "₹", label: "Indian Rupee (INR)" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar (AUD)" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar (CAD)" },
];

const RATES_KEY = "wcmh_exchange_rates";
const RATES_TIMESTAMP_KEY = "wcmh_exchange_rates_ts";
const CURRENCY_KEY = "wcmh_selected_currency";
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

// Fallback rates (ZAR-based, approximate)
const fallbackRates: Record<string, number> = {
  ZAR: 1,
  USD: 0.054,
  EUR: 0.050,
  GBP: 0.043,
  NGN: 83.5,
  KES: 6.95,
  BWP: 0.74,
  INR: 4.54,
  AUD: 0.085,
  CAD: 0.075,
};

export function useCurrency() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem(CURRENCY_KEY);
    return currencies.find((c) => c.code === saved) || currencies[0];
  });

  const [rates, setRates] = useState<Record<string, number>>(fallbackRates);

  useEffect(() => {
    const cachedRates = localStorage.getItem(RATES_KEY);
    const cachedTs = localStorage.getItem(RATES_TIMESTAMP_KEY);
    if (cachedRates && cachedTs && Date.now() - Number(cachedTs) < CACHE_DURATION) {
      try {
        setRates(JSON.parse(cachedRates));
        return;
      } catch {}
    }

    // Fetch from a free API
    fetch("https://api.exchangerate-api.com/v4/latest/ZAR")
      .then((r) => r.json())
      .then((data) => {
        if (data?.rates) {
          setRates(data.rates);
          localStorage.setItem(RATES_KEY, JSON.stringify(data.rates));
          localStorage.setItem(RATES_TIMESTAMP_KEY, String(Date.now()));
        }
      })
      .catch(() => {
        // Use fallback rates
      });
  }, []);

  const changeCurrency = useCallback((currency: Currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem(CURRENCY_KEY, currency.code);
  }, []);

  const convert = useCallback(
    (amountInZAR: number): number => {
      const rate = rates[selectedCurrency.code] || 1;
      return amountInZAR * rate;
    },
    [rates, selectedCurrency]
  );

  const formatPrice = useCallback(
    (amountInZAR: number): string => {
      const converted = convert(amountInZAR);
      return `${selectedCurrency.symbol}${converted.toFixed(2)}`;
    },
    [convert, selectedCurrency]
  );

  return { selectedCurrency, currencies, changeCurrency, convert, formatPrice, rates };
}
