export const loadCartState = (): any[] => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.warn("Load cart error:", error);
    return [];
  }
};

export const saveCartState = (state: any[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (error) {
    console.log("Save cart error:", error);
  }
};
