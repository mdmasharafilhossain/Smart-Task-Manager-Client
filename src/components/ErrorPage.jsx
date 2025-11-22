import { Link } from "react-router";

export default function ErrorPage({
  status = 404,
  title = "Page not found",
  message = "We couldn't find the page you're looking for.",
  primaryAction = { label: "Go to Home", to: "/" },
  secondaryAction = null, 
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d4d4d3] p-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md border border-[#8FABD4]/10 overflow-hidden">
        <div className="md:flex">
     
          <div className="md:w-1/3 bg-linear-to-br from-[#8FABD4]/10 to-transparent flex items-center justify-center p-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-[#8FABD4]">{status}</div>
              <div className="mt-2 text-xs text-[#6B7280]">Error code</div>
            </div>
          </div>

       
          <div className="md:w-2/3 p-8">
            <h1 className="text-2xl font-semibold text-[#1F2937]">{title}</h1>
            <p className="mt-3 text-sm text-[#4A4A4A]">{message}</p>

         
            <div className="mt-6 flex flex-wrap gap-3">
              {primaryAction && primaryAction.to ? (
                <Link
                  to={primaryAction.to}
                  className="inline-block px-4 py-2 rounded-lg text-white font-medium shadow-sm"
                  style={{ background: "linear-gradient(90deg,#8FABD4,#6FA8D6)" }}
                >
                  {primaryAction.label}
                </Link>
              ) : primaryAction && primaryAction.onClick ? (
                <button
                  onClick={primaryAction.onClick}
                  className="inline-block px-4 py-2 rounded-lg text-white font-medium shadow-sm"
                  style={{ background: "linear-gradient(90deg,#8FABD4,#6FA8D6)" }}
                >
                  {primaryAction.label}
                </button>
              ) : null}

              {secondaryAction ? (
                secondaryAction.to ? (
                  <Link
                    to={secondaryAction.to}
                    className="inline-block px-4 py-2 rounded-lg border border-[#E6E9EB] text-[#4A4A4A]"
                  >
                    {secondaryAction.label}
                  </Link>
                ) : (
                  <button
                    onClick={secondaryAction.onClick}
                    className="inline-block px-4 py-2 rounded-lg border border-[#E6E9EB] text-[#4A4A4A]"
                  >
                    {secondaryAction.label}
                  </button>
                )
              ) : null}
            </div>

            
            <p className="mt-4 text-xs text-[#6B7280]">
              If this problem persists, contact support or try again later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
