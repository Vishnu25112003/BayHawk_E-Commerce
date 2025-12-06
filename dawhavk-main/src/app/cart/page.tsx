import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";

export default function cartPage(){
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <Header />

            <div className="container-sm mx-auto px-16 py-4">
                <Cart />
            </div>
        </div>
    );
}