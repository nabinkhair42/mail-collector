"use client";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { gsap } from "gsap";
import { FormEvent, useRef, useState, useEffect } from "react";

interface MembersSuccessResponse {
  email_address: string;
}

function NewsletterForm() {
  const [input, setInput] = useState("");
  const [successMessage, setSuccessMessage] = useState<
    MembersSuccessResponse | undefined
  >();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const messageBoxRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = input;
    const button = buttonRef.current;

    if (!email || !button) return;

    setIsSending(true);

    const res = await fetch("/api/addSubscription", {
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const data = await res.json();

    setIsSending(false);

    if (data.error) {
      setErrorMessage("Hey, you are already subscribed!");
      setSuccessMessage(undefined);
      return;
    }

    setSuccessMessage(data.res);
    setIsSignedUp(true);

    setTimeout(() => {
      setIsSignedUp(false);
      setSuccessMessage(undefined);
      setErrorMessage("undefined");
      console.log("cleared");
    }, 1500);
  };

  

  const dismissMessages = () => {
    setSuccessMessage(undefined);
    setErrorMessage("");
  };

  useEffect(() => {
    if (messageBoxRef.current) {
      gsap.fromTo(
        messageBoxRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    if (isSignedUp && buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 1 },
        { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 }
      );
    }
  }, [isSignedUp]);

  return (
    <div className="flex flex-col space-y-8 md:w-[400px] w-fit">
      <form onSubmit={handleSubmit} className="newsletter-form mt-10 w-full">
        <div className="group flex items-center gap-x-4 py-1 pl-4 pr-1 rounded-[9px] bg-white border shadow-md w-full">
          <EnvelopeIcon className="hidden sm:inline w-6 h-6" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Email address"
            required
            type="email"
            className="flex-1 text-sm sm:text-base outline-none placeholder-gray-400 px-4 py-2 w-full"
          />
          <button
            ref={buttonRef}
            className={`${
              isSending || isSignedUp ? "active" : ""
            } disabled:!bg-blue-200 disabled:grayscale-[65%] disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base rounded px-2 py-2 bg-blue-400 sm:w-auto w-fit`}
            disabled={!input || isSending}
            type="submit"
          >
            {isSending ? (
              <span className="sending">Signing Up...</span>
            ) : isSignedUp ? (
              <span className="signed-up">Signed Up</span>
            ) : (
              <span className="default">Sign Up</span>
            )}
          </button>
        </div>
      </form>

      <div className="w-[350px] flex absolute top-0 left-1/2 transform -translate-x-1/2 text-justify ">
        {(successMessage || errorMessage) && (
          <div
            ref={messageBoxRef}
            className="flex rounded-[9px] py-4 px-6 shadow-md bg-white border"
          >
            <div className="h-6 w-6 bg-emerald-400 flex items-center justify-center rounded-full border">
              <CheckIcon className="h-4 w-6" />
            </div>
            <div className="text-xs sm:text-sm ml-2">
              {successMessage ? (
                <p>
                  We&apos;ve added{" "}
                  <span className="text-emerald-600">
                    {successMessage.email_address}
                  </span>{" "}
                  to our waitlist. We&apos;ll let you know when we launch!
                </p>
              ) : (
                <p>
                  You are already added to our waitlist. We&apos;ll let you know
                  when we launch!
                </p>
              )}
            </div>
            <XMarkIcon
              className="h-5 w-5 cursor-pointer flex-shrink-0 text-slate-950 ml-2"
              onClick={dismissMessages}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsletterForm;
