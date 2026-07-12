import * as Flags from "country-flag-icons/react/1x1";
import * as FlagStrings from "country-flag-icons/string/1x1";

type FlagProps = { className?: string };

const FLAG_MAP: Record<string, React.ComponentType<FlagProps>> = {
  AE: Flags.AE as React.ComponentType<FlagProps>,
  SA: Flags.SA as React.ComponentType<FlagProps>,
  QA: Flags.QA as React.ComponentType<FlagProps>,
  OM: Flags.OM as React.ComponentType<FlagProps>,
  KW: Flags.KW as React.ComponentType<FlagProps>,
  MY: Flags.MY as React.ComponentType<FlagProps>,
  SG: Flags.SG as React.ComponentType<FlagProps>,
  CA: Flags.CA as React.ComponentType<FlagProps>,
  GB: Flags.GB as React.ComponentType<FlagProps>,
  AU: Flags.AU as React.ComponentType<FlagProps>,
  DE: Flags.DE as React.ComponentType<FlagProps>,
  US: Flags.US as React.ComponentType<FlagProps>,
  IE: Flags.IE as React.ComponentType<FlagProps>,
  DK: Flags.DK as React.ComponentType<FlagProps>,
  MT: Flags.MT as React.ComponentType<FlagProps>,
  RU: Flags.RU as React.ComponentType<FlagProps>,
  NZ: Flags.NZ as React.ComponentType<FlagProps>,
};

const FLAG_STRINGS: Record<string, string> = {
  AE: FlagStrings.AE,
  SA: FlagStrings.SA,
  QA: FlagStrings.QA,
  OM: FlagStrings.OM,
  KW: FlagStrings.KW,
  MY: FlagStrings.MY,
  SG: FlagStrings.SG,
  CA: FlagStrings.CA,
  GB: FlagStrings.GB,
  AU: FlagStrings.AU,
  DE: FlagStrings.DE,
  US: FlagStrings.US,
  IE: FlagStrings.IE,
  DK: FlagStrings.DK,
  MT: FlagStrings.MT,
  RU: FlagStrings.RU,
  NZ: FlagStrings.NZ,
};

export function CountryFlag({ code, className }: { code: string; className?: string }) {
  const Comp = FLAG_MAP[code.toUpperCase()];
  if (!Comp) return <span className={className}>{code.toUpperCase()}</span>;
  return <Comp className={className} />;
}

export function getCountryFlagSvg(code: string): string {
  return FLAG_STRINGS[code.toUpperCase()] ?? "";
}
