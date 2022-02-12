import {  Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import HorizonLNB from '../../../components/LNB/horizonLNB';

import List from './list'
import Create from './create'
import Edit from './edit'
import Product from './product'
import ProductNew from './productNew'
import ProductEdit from './productEdit'

export default function Router() {
    const navigate = useNavigate()
    const location = useLocation()

  return (
    <>
        <HorizonLNB exact selected={location.pathname} menu={[
            {id: "/admin/project", text: '리스트', onClick: () => navigate("/admin/project")},
            {id: "/admin/project/create", text: '생성', onClick: () => navigate("/admin/project/create")},
            {id: "/admin/project/edit", text: '편집', onClick: () => navigate("/admin/project/edit")},
            {id: "/admin/project/product", text: '상품 리스트', onClick: () => navigate("/admin/project/product")},
            {id: "/admin/project/product/new", text: '상품 생성', onClick: () => navigate("/admin/project/product/new")},
            {id: "/admin/project/product/edit", text: '상품 편집', onClick: () => navigate("/admin/project/product/edit")},
        ]} />

        <Routes>
            <Route path="/" element={<List />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/new" element={<ProductNew />} />
            <Route path="/product/edit" element={<ProductEdit />} />
        </Routes>
    </>
  );
};
