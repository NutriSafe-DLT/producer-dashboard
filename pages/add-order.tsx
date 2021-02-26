import MainLayout from "../src/components/layout";
import WithAuthorization from "../src/components/base/withAuthorization";
import ShippingOrderForm from "./forms/shipping-order";


export default function AddOrder() {
    return (
        <MainLayout>
            <WithAuthorization requiredRole="ROLE_ADMIN">
                <ShippingOrderForm />
            </WithAuthorization>
        </MainLayout>
    );

}