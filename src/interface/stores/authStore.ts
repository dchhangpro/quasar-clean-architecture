import { defineStore } from 'pinia';
import {
  signInUseCase,
  signUpUseCase,
  signInWithGoogleUseCase,
  signOutUseCase,
  initializeUserUseCase,
  resetPasswordUseCase,
  deleteAccountUseCase,
} from 'src/di';
import type { User } from 'src/domain/entities/User';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async signIn(email: string, password: string) {
      this.user = await signInUseCase.execute(email, password);
    },
    async signUp(email: string, password: string) {
      this.user = await signUpUseCase.execute(email, password);
    },
    async signInWithGoogle() {
      this.user = await signInWithGoogleUseCase.execute();
    },
    async signOut() {
      this.user = await signOutUseCase.execute();
    },
    async initializeUser() {
      this.user = await initializeUserUseCase.execute();
    },
    async resetPassword(email: string) {
      await resetPasswordUseCase.execute(email);
    },
    async setInvalidatedPenaltyToUser(user: User) {
      this.user = await setInvalidatedPenaltyToUserUseCase.execute(user);
    },
    async deleteAccount(email: string) {
      await deleteAccountUseCase.execute(email);
    },
    async getSubscriptionInformations() {
      this.subscription = await getSubscriptionInformationsUseCase.execute();
    },
  },
});
