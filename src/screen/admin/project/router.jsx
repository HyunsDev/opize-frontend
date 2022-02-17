import {  Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import { HorizonLNB } from 'opize-components'

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
            {id: "/admin/project", label: '리스트', onClick: () => navigate("/admin/project")},
            {id: "/admin/project/create", label: '생성', onClick: () => navigate("/admin/project/create")},
            {id: "/admin/project/edit", label: '편집', onClick: () => {}},
            {id: "/admin/project/product", label: '상품 리스트', onClick: () => {}},
            {id: "/admin/project/product/new", label: '상품 생성', onClick: () => {}},
            {id: "/admin/project/product/edit", label: '상품 편집', onClick: () => {}},
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
