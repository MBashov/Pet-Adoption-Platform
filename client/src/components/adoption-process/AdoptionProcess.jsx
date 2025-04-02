import { CheckCircle } from "lucide-react";

export default function AdoptionProcess() {
  const steps = [
    "First Register",
    "Apply to Adopt",
    "Fill the Form",
    "We Will Contact You"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center"
    style={{
        backgroundImage: "url('/images/best3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }}
    >
      <div className="max-w-3xl mx-auto p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Adoption Process</h2>
        <p className="text-gray-700 mb-6">
          Read about the steps and requirements for adopting a pet.
        </p>
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <CheckCircle className="text-green-500 w-6 h-6" />
              <span className="text-lg font-medium text-gray-800">{index + 1}. {step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
