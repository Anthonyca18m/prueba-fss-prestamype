import { ref, computed, watch, nextTick } from 'vue'
import { defineStore } from 'pinia'
import { db } from '../config/firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'

interface ExchangeRates {
  purchase_price: number
  sale_price: number
}

type ErrorType = 'network' | 'data' | 'validation'

interface StoreError {
  message: string
  type: ErrorType
}

const RATES_DOC_ID = import.meta.env.VITE_FIREBASE_RATES_DOC_ID
const DEBOUNCE_MS = 300

export const useExchangeStore = defineStore('exchange', () => {

  // State
  const purchasePrice = ref(0)
  const salePrice = ref(0)
  const inputAmount = ref(0)
  const outputAmount = ref(0)
  const isSolesToDollars = ref(false)
  const loading = ref(true)
  const error = ref<StoreError | null>(null)

  let unsubscribe: (() => void) | null = null
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  // Helpers
  const setError = (message: string, type: ErrorType) => {
    error.value = { message, type }
    outputAmount.value = 0
  }

  const validateRatesAndAmount = (): boolean => {
    if (purchasePrice.value <= 0 || salePrice.value <= 0) {
      setError('Rates not loaded yet', 'data')
      return false
    }
    if (inputAmount.value <= 0) {
      setError('Enter a positive amount', 'validation')
      return false
    }
    error.value = null
    return true
  }

  // Firebase listener
  const initListener = () => {
    unsubscribe = onSnapshot(
      doc(db, 'rates', RATES_DOC_ID),
      (docSnap) => {
        loading.value = false
        if (!docSnap.exists()) {
          return setError('No rates data available', 'data')
        }

        const data = docSnap.data() as ExchangeRates
        if (data.purchase_price > 0 && data.sale_price > 0) {
          purchasePrice.value = data.purchase_price
          salePrice.value = data.sale_price
          error.value = null
          performConversion()
        } else {
          setError('Invalid rate values', 'data')
        }
      },
      (err) => {
        loading.value = false
        setError(`Network error: ${err.message}`, 'network')
      }
    )
  }

  initListener()

  const dispose = () => {
    unsubscribe?.()
    unsubscribe = null
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = null
  }

  // Computed agrupados
  const currencyInfo = computed(() => {
    return isSolesToDollars.value
      ? { inLabel: 'Soles', outLabel: 'Dólares', inSymbol: 'S/', outSymbol: '$' }
      : { inLabel: 'Dólares', outLabel: 'Soles', inSymbol: '$', outSymbol: 'S/' }
  })

  const formattedPurchasePrice = computed(() => purchasePrice.value.toFixed(4))
  const formattedSalePrice = computed(() => salePrice.value.toFixed(4))

  // Conversion
  const performConversion = () => {
    if (!validateRatesAndAmount()) return
    outputAmount.value = isSolesToDollars.value
      ? inputAmount.value / salePrice.value
      : inputAmount.value * purchasePrice.value
  }

  const convert = () => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => performConversion(), DEBOUNCE_MS)
  }

  const toggleExchangeType = (): void => {
    isSolesToDollars.value = !isSolesToDollars.value 
    error.value = null 
    nextTick(() => performConversion())
  }

  // Watchers
  watch(inputAmount, () => convert())

  // Expose
  return {
    purchasePrice,
    salePrice,
    inputAmount,
    outputAmount,
    isSolesToDollars,
    loading,
    error,
    currencyInfo,
    formattedPurchasePrice,
    formattedSalePrice,
    convert,
    toggleExchangeType,
    dispose
  }
})
