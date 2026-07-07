import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails'
import Login from './pages/Login'
import Register from './pages/Register';
import Cart from './pages/Cart'
import Checkout from './pages/CheckOut';
import Address from "./pages/Address";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from './pages/AdminUser';
import AdminProducts from './pages/AdmminProduct';
import AddProduct from './pages/AddProduct';
function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:id' element={<ProductDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path="/address" element={<Address />} />
        <Route path='/orders' element={<Orders/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route  path="/admin/orders" element={<AdminOrders />}/>
        <Route path='/admin/users' element={<AdminUsers/>}/>
        <Route
    path="/admin/products"
    element={<AdminProducts />}/>
<Route
    path="/admin/products/add"
    element={<AddProduct />}
/>

<Route
    path="/admin/products/edit/:id"
    element={<AddProduct />}
/>

<Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
