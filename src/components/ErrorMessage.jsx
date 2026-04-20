function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div
      className="mt-4 w-full min-w-0 rounded-[1.4rem] border border-rose-400/20 bg-rose-500/8 px-5 py-4 text-sm text-rose-100 shadow-[0_0_24px_rgba(251,113,133,0.08)]"
      role="alert"
    >
      {message}
    </div>
  );
}

export default ErrorMessage;
