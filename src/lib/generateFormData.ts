import _ from "lodash";

interface Options {
  removeEmpty?: boolean;
}

export function generateFormData(inputValues: Record<string, any>, options?: Options): FormData {
  const formData = new FormData();

  _.forEach(inputValues, (val, key) => {
    if(options?.removeEmpty) {
      if(val === undefined || val === null || val === "") {
        return ;
      }
    } 
    formData.append(key, val);
  });

  return formData;
}
