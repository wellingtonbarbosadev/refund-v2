

type Props = React.ComponentProps<"select"> & {
  legend?: string;
};

export function Select({ legend, children,...rest }: Props) {
  return (
    <fieldset className="flex flex-1 text-gray-200 focus-within:text-green-100">
      {legend && (
        <legend className="uppercase text-xs text-inherit mb-2">
          {legend}
        </legend>
      )}

      <select
        className="w-full h-12 border border-gray-300 rounded-lg px-4 text-sm text-gray-100 bg-transparent focus:outline-green-100"
        value=""
        {...rest}
      >
        <option value="" disabled hidden>
          Selecione
        </option>

        {children}
      </select>
    </fieldset>
  );
}
