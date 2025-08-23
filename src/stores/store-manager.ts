class StoreManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleLogin(user: any, token: string) {
    Promise.all([import('./auth.store'), import('./cart.store')]).then(
      ([{ useAuthStore }, { useCartStore }]) => {
        const authStore = useAuthStore.getState();
        const cartStore = useCartStore.getState();

        authStore.login(user, token);

        cartStore.setCurrentUserId(user.id);
      }
    );
  }

  handleLogout() {
    Promise.all([import('./auth.store'), import('./cart.store')]).then(
      ([{ useAuthStore }, { useCartStore }]) => {
        const authStore = useAuthStore.getState();
        const cartStore = useCartStore.getState();

        authStore.logout();

        cartStore.setCurrentUserId('');
      }
    );
  }

  initializeCartFromAuth() {
    Promise.all([import('./auth.store'), import('./cart.store')]).then(
      ([{ useAuthStore }, { useCartStore }]) => {
        const authState = useAuthStore.getState();
        const cartStore = useCartStore.getState();

        if (authState.isAuthenticated && authState.user) {
          if (cartStore.currentUserId !== authState.user.id) {
            cartStore.setCurrentUserId(authState.user.id);
          }
        } else {
          cartStore.setCurrentUserId('');
        }
      }
    );
  }
}

export const storeManager = new StoreManager();
