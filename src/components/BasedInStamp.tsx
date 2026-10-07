import { useEffect, useState } from "react";
import stampFrame from "@/assets/basedin/stampframe.svg";

const VALENCIA_TZ = "Europe/Madrid";

const LOCALE_MAP = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
} as const;

type StampLang = keyof typeof LOCALE_MAP;

function useValenciaClock(lang: StampLang) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const locale = LOCALE_MAP[lang];

  const date = new Intl.DateTimeFormat(locale, {
    timeZone: VALENCIA_TZ,
    month: "short",
    day: "numeric",
  }).format(now);

  const time = new Intl.DateTimeFormat(locale, {
    timeZone: VALENCIA_TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  return { date, time };
}

function CloudsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 99.58 93.42"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M16.556 37.599c3.423 0 6.361 2.078 7.621 5.041.217-.017.436-.028.658-.028 4.572 0 8.279 3.706 8.279 8.278s-3.707 8.279-8.279 8.279c-1.509 0-2.922-.407-4.14-1.112-1.218.705-2.631 1.112-4.139 1.112s-2.922-.406-4.14-1.111c-1.217.704-2.63 1.111-4.138 1.111C3.706 59.168 0 55.462 0 50.89s3.706-8.278 8.278-8.278c.221 0 .44.011.657.028 1.26-2.963 4.198-5.041 7.621-5.041z"
      />
      <path
        fill="currentColor"
        d="M44.48 64.616c4.409 0 8.193 2.676 9.818 6.492.281-.022.564-.036.851-.036 5.892 0 10.668 4.777 10.668 10.669s-4.776 10.668-10.668 10.668c-1.945 0-3.766-.522-5.336-1.431-1.569.908-3.39 1.431-5.333 1.431s-3.766-.522-5.336-1.431c-1.569.908-3.39 1.431-5.333 1.431-5.893 0-10.669-4.776-10.669-10.668s4.776-10.669 10.669-10.669c.285 0 .568.014.848.036 1.625-3.817 5.41-6.492 9.821-6.492z"
      />
      <path
        fill="currentColor"
        d="M80.773 0c3.74 0 6.949 2.269 8.326 5.505.238-.019.478-.031.72-.031 4.996 0 9.046 4.05 9.046 9.046s-4.05 9.045-9.046 9.045c-1.647 0-3.189-.443-4.519-1.212-1.332.771-2.877 1.216-4.527 1.216s-3.192-.444-4.523-1.214c-1.331.77-2.874 1.214-4.523 1.214-4.995-.001-9.044-4.051-9.044-9.046s4.049-9.045 9.044-9.045c.242 0 .482.012.718.031C73.822 2.271 77.033 0 80.773 0z"
      />
    </svg>
  );
}

type BasedInStampProps = {
  label: string;
  country: string;
  city: string;
  lang: StampLang;
};

export function BasedInStamp({ label, country, city, lang }: BasedInStampProps) {
  const { date, time } = useValenciaClock(lang);

  return (
    <div className="based-in">
      <p className="home-bento-label based-in-label">{label}</p>

      <div className="based-in-stamp">
        <img
          src={stampFrame}
          alt=""
          className="based-in-stamp-frame"
          draggable={false}
        />

        <div className="based-in-stamp-content">
          <div className="based-in-clock" aria-live="polite">
            <span>{date}</span>
            <span>{time}</span>
          </div>

          <div className="based-in-clouds" aria-hidden="true">
            <div className="based-in-clouds-track">
              <div className="based-in-clouds-set">
                <CloudsIcon className="based-in-clouds-icon" />
              </div>
              <div className="based-in-clouds-set">
                <CloudsIcon className="based-in-clouds-icon" />
              </div>
            </div>
          </div>

          <div className="based-in-place">
            <p className="based-in-country">{country}</p>
            <p className="based-in-city">{city}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
