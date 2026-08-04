type Props = React.ComponentProps<"input"> & {
  legend?: string;
  file?: File | null;
};

export function Upload({ legend, file = null, ...rest }: Props) {
  let fileName = "Sem arquivo";
  if (file) {
    fileName = file.name;
  }

  return (
    <fieldset className="flex flex-1 text-gray-200 focus-within:text-green-100">
      {legend && (
        <legend className="uppercase text-xs text-inherit mb-2">
          {legend}
        </legend>
      )}

      <label className="w-full">
        <input type="file" className="" {...rest} />

        <section
          className={`inputFile w-full h-12 border border-gray-300 rounded-lg px-4 text-sm text-gray-200 bg-transparent focus:outline-green-100`}
        >
          <span className="fileName">{fileName}</span>
        </section>
      </label>
    </fieldset>
  );
}
