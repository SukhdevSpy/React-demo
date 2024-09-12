import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { getProductAsync, getProductCategoriesAsync, productState } from "./productSlice";
import { Container, Dropdown, DropdownButton, Table } from "react-bootstrap";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loader from "../common/Loader";

const Product = () => {

    const dispatchApp = useAppDispatch();
    const [category, setCategory] = useState<any>({});
    const { status, products, productCategories } = useAppSelector(productState);

    useEffect(() => {
        dispatchApp(getProductAsync(""));
        dispatchApp(getProductCategoriesAsync());
    }, []);

    const onChangeCategory = (index: number) => {
        setCategory(productCategories?.data[index]);
        dispatchApp(getProductAsync('/category/' + productCategories?.data[index].slug));
    }

    // if (status === "loading") {
    //     return <Loader />;
    // }


    const productList = products?.data?.products?.map((product: any, index: number) => {
        return (
            <tr key={`product_${index}`}>
                <td className="align-middle">{product.id}</td>
                <td className="align-middle" align="center">
                    <LazyLoadImage
                        src={product.images[0]}
                        effect="blur"
                        height={100} />
                </td>
                <td className="align-middle">{product.title}</td>
                <td className="align-middle">{product.category}</td>
                <td className="align-middle">{product.price}</td>
                <td className="align-middle">{product.availabilityStatus}</td>
            </tr>
        );
    });

    const productCategoryList = productCategories?.data?.map((cat: any, index: number) => {
        return (
            <Dropdown.Item key={'category_' + index} onClick={() => { onChangeCategory(index) }} active={cat.slug == category.slug}> {cat.name} </Dropdown.Item>
        );
    })

    return (
        <Container className="mt-5">
            <DropdownButton
                id="dropdown-button-dark-example2"
                variant="secondary"
                title={category.name || "Select Category"}
                className="mb-2"
                data-bs-theme="dark"
            >
                {productCategoryList}

            </DropdownButton>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="align-middle">#</th>
                        <th className="align-middle text-center w-25" >Image</th>
                        <th className="align-middle">Product Title</th>
                        <th className="align-middle">Category</th>
                        <th className="align-middle">Price</th>
                        <th className="align-middle">Stock</th>
                    </tr>
                </thead>
                <tbody>
                   {status == 'loading' ? <tr><td colSpan={6}><Loader /></td></tr> : productList}
                </tbody>
            </Table>
        </Container>
    );
}
export default Product;