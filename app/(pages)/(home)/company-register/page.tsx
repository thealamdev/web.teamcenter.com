export default function CompanyRegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form className="w-full max-w-lg p-6 border rounded-lg space-y-4">
                <h1 className="text-2xl font-bold text-center">Register Company</h1>

                <input className="w-full border p-2 rounded" placeholder="Company Name" />
                <input className="w-full border p-2 rounded" placeholder="Domain (e.g. acme.com)" />
                <input className="w-full border p-2 rounded" placeholder="Owner Name" />
                <input className="w-full border p-2 rounded" placeholder="Email" type="email" />
                <input className="w-full border p-2 rounded" placeholder="Address" />

                <button className="w-full bg-blue-600 text-white py-2 rounded">
                    Register Company
                </button>

                <p className="text-center text-sm">
                    Already have a company?{" "}
                    <a href="/login" className="text-blue-600">Login</a>
                </p>
            </form>
        </div>
    );
}