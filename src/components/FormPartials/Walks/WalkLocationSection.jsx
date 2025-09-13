import { Controller } from "react-hook-form";
import SelectLocationForm from "../Locations/SelectLocationForm";
import SelectParkForm from "../Parks/SelectParkForm";

const WalkLocationSection = ({
  locationType,
  control,
  register,
  errors,
}) => {
  return (
    <>
      {locationType === "custom" && (
        //Lib react hook form - Controller se connect à "control" qui vient de GenericPostAdForm par ex
        //Le Controller utilise control" pr communiquer avec le form principal , 
        //récupère donc la valeur actuelle de field.value et envoi changements via field.onChange
        <Controller
          name="locationData"
          //Controlleur de valeur
          control={control}
          defaultValue={{
            city: "",
            street: "",
            latitude: null,
            longitude: null,
            name: "",
          }}
          render={({ field }) => (
            <SelectLocationForm
              value={field.value}
              onLocationDataChange={field.onChange}
            />
          )}
        />
      )}

      {locationType === "park" && (
        <SelectParkForm register={register} errors={errors} />
      )}
    </>
  );
};

export default WalkLocationSection;
