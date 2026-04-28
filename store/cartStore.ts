import { create } from "zustand"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface AddressData {
  street: string
  neighborhood: string
  city: string
  state: string
  cityState: string
}

interface CartState {
  items: CartItem[]
  cep: string
  shippingCost: number | null
  address: AddressData | null
  setCep: (cep: string) => void
  setShippingCost: (cost: number | null) => void
  setAddress: (address: AddressData) => void
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

export const useCart = create<CartState>((set) => ({
  items: [],
  cep: "",
  shippingCost: null,
  address: null,
  setCep: (cep) => set({ cep }),
  setShippingCost: (cost) => set({ shippingCost: cost }),
  setAddress: (address) => set({ address }),
  addItem: (item) =>
    set((state) => {
      const exists = state.items.find((i) => i.name === item.name)
      if (exists) return { items: state.items }
      return { items: [...state.items, item] }
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clearCart: () => set({ items: [], shippingCost: null, cep: "", address: null }),
}))
