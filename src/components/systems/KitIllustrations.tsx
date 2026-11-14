import type { ReactElement, ReactNode } from 'react';
import type { KitIllustrationKey } from '@/types';

const palette = {
  blue: '#1D5F94',
  blueLight: '#2E76AD',
  blueDark: '#154B77',
  cream: '#EAE4D4',
  leaf: '#4F8A3D',
  leafLight: '#78A85A',
  leafDark: '#164B2B',
  ink: '#1F2933',
  grey: '#9AA5A0',
  brown: '#6B4A2F',
  white: '#F7FAF7',
};

function Art({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <ellipse cx="32" cy="56.5" rx="17" ry="3" fill="#0B351C" opacity="0.08" />
      {children}
    </svg>
  );
}

const illustrations: Record<KitIllustrationKey, () => ReactElement> = {
  planter: () => (
    <Art>
      <path d="M32 21c-2-7 1-12 8-13-1 8-4 12-8 13Z" fill={palette.leaf} />
      <path d="M32 21c-4-5-8-7-14-6 3 6 8 8 14 6Z" fill={palette.leafLight} />
      <path d="M16 26h32l-3.6 20.5a4 4 0 0 1-3.9 3.3H23.5a4 4 0 0 1-3.9-3.3L16 26Z" fill={palette.blue} />
      <path d="M14 22h36v5H14z" fill={palette.cream} />
      <path d="M23 30h2.4l1.8 16h-2.4L23 30Z" fill={palette.blueLight} opacity="0.8" />
      <path d="M31.8 26v-3" stroke={palette.leafDark} strokeWidth="1.6" />
    </Art>
  ),
  filter: () => (
    <Art>
      <ellipse cx="32" cy="34" rx="19" ry="7" fill={palette.blueDark} />
      <path d="M13 34v6c0 3.9 8.5 7 19 7s19-3.1 19-7v-6Z" fill={palette.blue} />
      <ellipse cx="32" cy="34" rx="19" ry="7" fill={palette.blueLight} />
      <ellipse cx="32" cy="34" rx="12" ry="4.2" fill={palette.cream} />
      <g fill={palette.blueDark}>
        <circle cx="25" cy="34" r="1" />
        <circle cx="29" cy="35.4" r="1" />
        <circle cx="33" cy="35.8" r="1" />
        <circle cx="37" cy="34.8" r="1" />
        <circle cx="29" cy="32.6" r="1" />
        <circle cx="34" cy="32.4" r="1" />
      </g>
    </Art>
  ),
  stand: () => (
    <Art>
      <path d="M20 20h24l3 4H17l3-4Z" fill={palette.cream} />
      <path d="M18 24h28l-3 6H21l-3-6Z" fill={palette.blueLight} />
      <path d="M21 30h7l-3 20h-4l0-20Z" fill={palette.blue} />
      <path d="M36 30h7l0 20h-4l-3-20Z" fill={palette.blue} />
      <path d="M16 50h13v3H16zM35 50h13v3H35z" fill={palette.blueDark} />
      <path d="M28 30h8v4h-8z" fill={palette.blueDark} opacity="0.5" />
    </Art>
  ),
  drainage: () => (
    <Art>
      <path d="M12 30 44 20l8 14-32 10Z" fill={palette.ink} />
      <path d="M16 31.4 43 23l5 9-27 8.4Z" fill="#2F3A44" />
      <g stroke={palette.ink} strokeWidth="1.2" opacity="0.8">
        <path d="M22 28.5 49 20M25 33l27-8.4M28 37.4l27-8.4" />
      </g>
      <g fill={palette.cream} opacity="0.65">
        <circle cx="26" cy="30" r="1.1" />
        <circle cx="33" cy="28" r="1.1" />
        <circle cx="40" cy="26" r="1.1" />
        <circle cx="30" cy="34.5" r="1.1" />
        <circle cx="37" cy="32.5" r="1.1" />
        <circle cx="44" cy="30.5" r="1.1" />
      </g>
    </Art>
  ),
  feeder: () => (
    <Art>
      <path d="M13 25h38l-3 25H16L13 25Z" fill={palette.blue} />
      <path d="M11 19h42v7H11z" fill={palette.blueLight} />
      <path d="M11 19h42v2.5H11z" fill={palette.blueDark} />
      <path d="M23 32h18v2H23zM23 40h18v2H23z" fill={palette.blueDark} opacity="0.35" />
      <circle cx="32" cy="36" r="2.4" fill={palette.cream} />
    </Art>
  ),
  motor: () => (
    <Art>
      <path d="M32 9v6" stroke={palette.ink} strokeWidth="2" strokeLinecap="round" />
      <path d="M27 15h10l2 5H25l2-5Z" fill={palette.ink} />
      <rect x="21" y="20" width="22" height="28" rx="6" fill={palette.ink} />
      <rect x="24.5" y="24" width="5" height="20" rx="2.5" fill="#4A5661" />
      <path d="M31 33h8" stroke={palette.cream} strokeWidth="2" strokeLinecap="round" />
      <circle cx="37" cy="33" r="2.4" fill={palette.cream} />
    </Art>
  ),
  timer: () => (
    <Art>
      <rect x="15" y="16" width="34" height="32" rx="5" fill={palette.white} stroke="#CBD5CF" strokeWidth="1.5" />
      <rect x="21" y="22" width="22" height="12" rx="2.5" fill="#DCE7DE" />
      <text x="32" y="31.2" textAnchor="middle" fontSize="7" fontWeight="700" fill={palette.leafDark}>
        06:00
      </text>
      <circle cx="24" cy="40" r="2.6" fill={palette.leaf} />
      <circle cx="32" cy="40" r="2.6" fill="#CBD5CF" />
      <circle cx="40" cy="40" r="2.6" fill="#CBD5CF" />
    </Art>
  ),
  drip: () => (
    <Art>
      <path
        d="M12 24c8-9 32-9 40 0s-8 14-20 14-28-5-20-14Z"
        stroke={palette.ink}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M18 33c5-5 23-5 28 0s-5 9-14 9-19-4-14-9Z"
        stroke="#39434D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M20 37v4M32 41v4M44 37v4" stroke="#39434D" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="43" r="1.6" fill={palette.leafLight} />
      <circle cx="32" cy="47" r="1.6" fill={palette.leafLight} />
      <circle cx="44" cy="43" r="1.6" fill={palette.leafLight} />
    </Art>
  ),
  plumbing: () => (
    <Art>
      <path d="M14 36h14a6 6 0 0 0 6-6V16" stroke={palette.grey} strokeWidth="6" strokeLinecap="round" />
      <path d="M34 42h10a6 6 0 0 0 6-6V24" stroke="#B9C3BD" strokeWidth="5" strokeLinecap="round" />
      <rect x="10" y="30" width="9" height="12" rx="2.5" fill="#C9D2CC" />
      <rect x="27" y="24" width="9" height="9" rx="2.5" fill="#C9D2CC" />
      <rect x="45" y="20" width="10" height="8" rx="2.5" fill="#C9D2CC" />
      <circle cx="33" cy="42" r="4" fill="#DCE3DE" stroke="#B9C3BD" strokeWidth="1.5" />
    </Art>
  ),
  soil: () => (
    <Art>
      <path d="M14 38h36l-3 13H17l-3-13Z" fill={palette.blue} />
      <path d="M12 35h40v4H12z" fill={palette.cream} />
      <path d="M16 35c3-9 10-13 16-13s13 4 16 13H16Z" fill={palette.brown} />
      <g fill="#8A6444">
        <circle cx="24" cy="31" r="1.4" />
        <circle cx="30" cy="27" r="1.2" />
        <circle cx="37" cy="27.5" r="1.5" />
        <circle cx="42" cy="32" r="1.2" />
        <circle cx="20" cy="33.5" r="1" />
      </g>
      <path d="M32 22c-1-5 1-8 6-9-1 6-2 8-6 9Z" fill={palette.leaf} />
    </Art>
  ),
  medium: () => (
    <Art>
      <path d="M14 28h36v22H14z" fill={palette.brown} />
      <path d="M14 28h36v5H14z" fill="#8A6444" />
      <path d="M14 46h36v4H14z" fill="#543A24" />
      <g stroke="#A87B52" strokeWidth="1.6" strokeLinecap="round">
        <path d="M20 37h9M24 42h12M38 35h7M18 44h6M43 42h3" />
      </g>
      <g fill="#A87B52">
        <circle cx="38" cy="38" r="1.6" />
        <circle cx="28" cy="33" r="1.4" />
        <circle cx="45" cy="33" r="1.2" />
      </g>
    </Art>
  ),
};

export function KitIllustration({ name, className }: { name: KitIllustrationKey; className?: string }) {
  const Illustration = illustrations[name];
  return (
    <span className={className}>
      <Illustration />
    </span>
  );
}
