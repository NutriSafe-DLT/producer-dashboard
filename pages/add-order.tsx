import MainLayout from "../src/components/layout";
import WithAuthorization from "../src/components/base/withAuthorization";
import ShippingOrderForm from "./forms/shipping-order";
import Head from "next/head";


export default function AddOrder() {
    return (
        <MainLayout>
            <Head>
                <title>Nutrisafe: Shipping order form</title>
                <meta property="og:title" content="Nutrisafe: Shipping order form" key="title" />
            </Head>
            <WithAuthorization requiredRole="ROLE_ADMIN">
                <ShippingOrderForm />
            </WithAuthorization>
        </MainLayout>
    );

}