import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Ready to hear what people really think?
        </h2>
        <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8">
          Join thousands who trust HiddenNote for honest, anonymous feedback.
        </p>
        <Link
          to="/signup"
          className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-amber-400/20 inline-block w-full sm:w-auto"
        >
          GET YOUR FREE LINK
        </Link>
      </div>
    </section>
  );
}

export default CTA;
