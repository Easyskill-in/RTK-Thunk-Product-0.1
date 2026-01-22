import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// axios.get("/a");
// axios.post("/a");

const FetchProduct = createAsyncThunk("Product/Get", async () => {
  try {
    console.log("\n\nFetching Product.....");
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  } catch (error) {
    return error.message;
  }
});

const FetchSingleProduct = createAsyncThunk("SingleProduct/Get", async (id) => {
  try {
    console.log("\n\nFetching Single Product.....");

    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);

    console.log("Single ", res);

    return res.data;
  } catch (error) {
    return error.message;
  }
});
const DeleteSingleProduct = createAsyncThunk(
  "DeleteSingleProduct/Delete",
  async (id) => {
    try {
      console.log("\n\nDeleteing Product.....");
      const res = await axios.delete(`https://fakestoreapi.com/products/${id}`);
      return res.data.id;
    } catch (error) {
      return error.message;
    }
  },
);
const AddSingleProduct = createAsyncThunk(
  "AddSingleProduct/POST",
  async (product) => {
    try {
      console.log("\n\nAdding Product.....");
      const res = await axios.post(
        `https://fakestoreapi.com/products`,
        product,
      );
      res.data.id = Date.now();
      //   res.data.name
      return res.data;
    } catch (error) {
      return error.message;
    }
  },
);
const UpdateProducts = createAsyncThunk(
  "UpdateProduct/PUT",
  async ({ id, Product }) => {
    try {
      console.log("\n\nUpdating Product.....");
      const res = await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        Product,
      );
      console.log("From Thunk  : ", res);
      return res.data;
    } catch (error) {
      return error.message;
    }
  },
);

const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    item: [],
    singleProduct: {
      id: 0,
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      rating: {
        rate: 0,
        count: 0,
      },
    },
    deletingId: null,
    loading: false,
    error: null,
  },
  reducers: {
    add: (state, action) => {
      state.item.push(action.payload);
    },
    remove: (state, action) => {
      state.item = state.item.filter(
        (product) => product.id !== action.payload,
      );
    },
    SingleProducts: (state, action) => {
      console.log("Data Is in action : ", action);
      if (!action.payload) {
        return;
      }
      const newProduct = state.item.find((value, index) => {
        return value.id == action.payload;
      });
      if (!newProduct) {
        console.log("No Product Found...");
        return;
      }
      state.singleProduct = newProduct;
    },
    reset: (state) => {
      state.item = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("From Thunk : ", state, action);
        state.item = action.payload;
      })
      .addCase(FetchProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(FetchSingleProduct.pending, (state, action) => {
        // console.log("Fetch Single Product", action)
        state.loading = true;
      })
      .addCase(FetchSingleProduct.fulfilled, (state, action) => {
        console.log("Fetch Single Product", action);
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(DeleteSingleProduct.pending, (state, action) => {
        // state.loading = true
        // state.deletingId = action.payload
      })
      .addCase(DeleteSingleProduct.fulfilled, (state, action) => {
        state.item = state.item.filter(
          (product) => product.id !== action.payload,
        );
        state.deletingId = null;
      })
      .addCase(AddSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddSingleProduct.fulfilled, (state, action) => {
        state.item.push(action.payload);
        state.loading = false;
        // // state.item.push(action.payload)
        // state.item = [...state.item, action.payload];
        // localStorage.setItem("products", JSON.stringify(state.item));
        // state.item = JSON.parse(localStorage.getItem("products"));
      })
      .addCase(UpdateProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateProducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log("UPT : ", action);
        state.item = state.item.map((value) => {
          return value.id === action.payload.id ? action.payload : value;
        });
      });
  },
});

export {
  FetchProduct,
  DeleteSingleProduct,
  FetchSingleProduct,
  AddSingleProduct,
  UpdateProducts,
};
export const { add, remove, reset, SingleProducts } = ProductSlice.actions;
export default ProductSlice.reducer;
