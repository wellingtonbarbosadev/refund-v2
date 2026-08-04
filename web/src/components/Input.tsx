type Props = React.ComponentProps<"input"> & {
  legend?: string;
  type?: string;
};
export function Input({ legend, type = "text", ...rest }: Props) {
  return (
    <fieldset className="flex flex-1 text-gray-200 focus-within:text-green-100">
      {legend && (
        <legend className="uppercase text-xs text-inherit mb-2">
          {legend}
        </legend>
      )}

      <input
        type={type}
        className="w-full h-12 border border-gray-300 rounded-lg px-4 text-sm text-gray-200 bg-transparent focus:outline-green-100"
        {...rest}
      />
    </fieldset>
  );
}
