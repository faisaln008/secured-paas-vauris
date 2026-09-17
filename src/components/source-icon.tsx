type SourceIconProps = {
  id: string;
  className?: string;
};

/**
 * Simplified brand marks drawn inline so the prototype ships with no image
 * assets or network requests.
 */
export function SourceIcon({ id, className = "h-6 w-6" }: SourceIconProps) {
  switch (id) {
    case "confluence":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            d="M1.1 16.1a.95.95 0 0 0 .32 1.3l4.15 2.55a.95.95 0 0 0 1.32-.32c.2-.33.42-.72.64-1.07 1.79-2.95 3.6-2.59 6.85-1.04l4.11 1.95a.95.95 0 0 0 1.27-.47l1.98-4.47a.95.95 0 0 0-.48-1.25c-.87-.4-2.6-1.22-4.15-1.97-5.6-2.72-10.35-2.4-14 3.47l-2.01 3.32Z"
            fill="#2684FF"
          />
          <path
            d="M22.9 7.9a.95.95 0 0 0-.32-1.3L18.43 4.05a.95.95 0 0 0-1.32.32c-.2.33-.42.72-.64 1.07-1.79 2.95-3.6 2.59-6.85 1.04L5.51 4.53a.95.95 0 0 0-1.27.47L2.26 9.47a.95.95 0 0 0 .48 1.25c.87.4 2.6 1.22 4.15 1.97 5.6 2.72 10.35 2.4 14-3.47L22.9 7.9Z"
            fill="#0052CC"
          />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="#181717"
            d="M12 .5C5.73.5.6 5.63.6 11.9c0 5.02 3.26 9.28 7.78 10.79.57.1.78-.25.78-.55v-2.1c-3.16.69-3.83-1.35-3.83-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.14.08 1.74 1.18 1.74 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.52-.29-5.17-1.26-5.17-5.62 0-1.24.44-2.25 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0c2.18-1.48 3.13-1.17 3.13-1.17.63 1.57.23 2.73.12 3.02.73.8 1.17 1.81 1.17 3.05 0 4.37-2.66 5.33-5.19 5.61.41.36.78 1.06.78 2.13v3.16c0 .3.2.66.79.55A11.41 11.41 0 0 0 23.4 11.9C23.4 5.63 18.27.5 12 .5Z"
          />
        </svg>
      );
    case "notion":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M4.5 3.3 15.9 2.4c1.4-.12 1.76-.04 2.64.6l3.05 2.15c.6.44.8.56.8 1.04v14.1c0 .88-.32 1.4-1.44 1.48l-13.2.8c-.84.04-1.24-.08-1.68-.64l-2.6-3.36c-.48-.64-.68-1.12-.68-1.68V4.78c0-.72.32-1.32 1.71-1.48Zm11.04 1.5L6.1 5.5c-.52.04-.64.3-.44.5l1.72 1.24c.32.22.52.26 1.12.22l9.12-.54c.4-.04.24-.28.04-.42l-1.44-1.04c-.2-.16-.48-.32-.68-.28ZM8.34 9.34v9.6c0 .52.26.72.84.68l10-.58c.58-.04.65-.4.65-.82V8.7c0-.42-.16-.64-.52-.6l-10.44.6c-.4.04-.53.24-.53.64Z"
          />
        </svg>
      );
    case "sharepoint":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="9.6" cy="7.2" r="5.4" fill="currentColor" opacity=".9" />
          <circle cx="16.2" cy="12" r="4.6" fill="currentColor" opacity=".6" />
          <circle cx="12.6" cy="18" r="3.8" fill="currentColor" opacity=".4" />
        </svg>
      );
    case "gdrive":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="m8.6 2.4 6.8 11.9H8.6L1.8 14.3 8.6 2.4Z" fill="currentColor" opacity=".55" />
          <path d="M15.4 2.4H8.6l6.8 11.9h6.8L15.4 2.4Z" fill="currentColor" opacity=".8" />
          <path d="M22.2 14.3H8.6l-3.4 6h13.6l3.4-6Z" fill="currentColor" opacity=".35" />
        </svg>
      );
    default:
      return null;
  }
}
