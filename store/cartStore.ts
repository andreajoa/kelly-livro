import { create } from "zustand"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface ShippingInfo {
  cep: string
  method: string
  price: number
  estimatedDays: number
  city: string
  state: string
  logradouro: string
  bairro: string
}

interface CartState {
  items: CartItem[]
  shipping: ShippingInfo | null
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  setShipping: (shipping: ShippingInfo) => void
  clearShipping: () => void
}

export const useCart = create<CartState>((set) => ({
  items: [],
  shipping: null,
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clearCart: () => set({ items: [], shipping: null }),
  setShipping: (shipping) => set({ shipping }),
  clearShipping: () => set({ shipping: null }),
}))
