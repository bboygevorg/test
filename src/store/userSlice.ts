import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

interface UserState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

// const fakeLoginApi = (email: string, password: string): Promise<User> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (email === "test@example.com" && password === "password") {
//         resolve({
//           id: "1",
//           name: "Test User",
//           email,
//           isLoggedIn: true,
//         });
//       } else {
//         reject(new Error("Неверный email или пароль"));
//       }
//     }, 1000);
//   });
// };

const fakeLoginApi = async (email: string, password: string): Promise<User> => {
  const res = await fetch("http://localhost:5000/user");
  const data = await res.json();
  const user = data.find(
    (u: { email: string }) => u.email === email && password === "password"
  );

  if (user) {
    console.log("true");
    return {
      id: user.id,
      name: user.name,
      email,
      isLoggedIn: true,
    };
  } else {
    throw new Error("Неверный email или пароль");
  }
};

export const loginAsync = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("user/loginAsync", async ({ email, password }, { rejectWithValue }) => {
  try {
    const user = await fakeLoginApi(email, password);
    return user;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = { ...action.payload, isLoggedIn: true };
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    updateProfile: (state, action: PayloadAction<User>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Ошибка входа";
      });
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
