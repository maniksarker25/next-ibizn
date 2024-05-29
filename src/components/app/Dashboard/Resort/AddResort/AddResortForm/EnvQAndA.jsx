import { React, useContext } from "react";
import { userContext } from "@/src/storage/contextApi";
import { ClipLoader } from "react-spinners";

const EnvQAndA = ({
  handleEnvChange,
  totalSteps,
  currentStep,
  setCurrentStep,
  increaseProgress,
  decreaseProgress,
  handleResortSubmit,
  resortData,
}) => {
  console.log({ resortData });
  const { submitLoader, setSubmitLoader } = useContext(userContext);
  // go to next step ------------
  const goToNextStep = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep + 1);
    increaseProgress();
  };
  // go to previous step ------------
  const goToPrevStep = () => {
    setCurrentStep(currentStep - 1);
    decreaseProgress();
  };
  return (
    <div>
      <h2 className="my-4 text-xl pb-2 border-b-2">Environmental Questions</h2>
      <form onSubmit={handleResortSubmit}>
        <div className="mb-4">
          <label
            htmlFor="q1"
            className="block text-sm font-medium text-gray-700"
          >
            Which conservation organisations does the operation support? If any.
          </label>
          <input
            type="text"
            id="q1"
            name="q1"
            defaultValue={resortData?.environmentalQuestionSchema?.q1}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q2"
            className="block text-sm font-medium text-gray-700"
          >
            Which efforts are taken to minimise overall environmental impact?
          </label>
          <input
            type="text"
            id="q2"
            name="q2"
            defaultValue={resortData?.environmentalQuestionSchema?.q2}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q3"
            className="block text-sm font-medium text-gray-700"
          >
            Which responsible diving practices are followed?
          </label>
          <input
            type="text"
            id="q3"
            name="q3"
            defaultValue={resortData?.environmentalQuestionSchema?.q3}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q4"
            className="block text-sm font-medium text-gray-700"
          >
            Which sustainable practices are adhered to?
          </label>
          <input
            type="text"
            id="q4"
            name="q4"
            defaultValue={resortData?.environmentalQuestionSchema?.q4}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q5"
            className="block text-sm font-medium text-gray-700"
          >
            Which environmental impact assessments are taken? If any.
          </label>
          <input
            type="text"
            id="q5"
            name="q5"
            defaultValue={resortData?.environmentalQuestionSchema?.q5}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q6"
            className="block text-sm font-medium text-gray-700"
          >
            Which community initiatives is the operator involved in? If any.
          </label>
          <input
            type="text"
            id="q6"
            name="q6"
            defaultValue={resortData?.environmentalQuestionSchema?.q6}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q7"
            className="block text-sm font-medium text-gray-700"
          >
            Which sustainable tourism initiatives is the operator involved in?
          </label>
          <input
            type="text"
            id="q7"
            name="q7"
            defaultValue={resortData?.environmentalQuestionSchema?.q7}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q8"
            className="block text-sm font-medium text-gray-700"
          >
            Does the operator have any self-authored initiatives?
          </label>
          <input
            type="text"
            id="q8"
            name="q8"
            defaultValue={resortData?.environmentalQuestionSchema?.q8}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <h2 className="my-5 text-xl pb-2 border-b-2">
          Plant Base / Vegan Meal Questions:
        </h2>
        <div className="mb-4">
          <label
            htmlFor="q9"
            className="block text-sm font-medium text-gray-700"
          >
            Do you provide plant-based meals for vegans or those on adapted
            diets?
          </label>
          <input
            type="text"
            id="q9"
            name="q9"
            defaultValue={resortData?.environmentalQuestionSchema?.q9}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q10"
            className="block text-sm font-medium text-gray-700"
          >
            Do you have a separate plant-based menu prepared?
          </label>
          <input
            type="text"
            id="q10"
            name="q10"
            defaultValue={resortData?.environmentalQuestionSchema?.q10}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q11"
            className="block text-sm font-medium text-gray-700"
          >
            Can you give five examples of your kitchen's best plant-based
            dishes?
          </label>
          <input
            type="text"
            id="q11"
            name="q11"
            defaultValue={resortData?.environmentalQuestionSchema?.q11}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q12"
            className="block text-sm font-medium text-gray-700"
          >
            Do you provide plant-based ‘milk’?
          </label>
          <input
            type="text"
            id="q12"
            name="q12"
            defaultValue={resortData?.environmentalQuestionSchema?.q12}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q13"
            className="block text-sm font-medium text-gray-700"
          >
            For a full board package, resort or liveaboard, how many days can
            you provide a changing, revolving plant-based menu?
          </label>
          <input
            type="text"
            id="q13"
            name="q13"
            defaultValue={resortData?.environmentalQuestionSchema?.q13}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q14"
            className="block text-sm font-medium text-gray-700"
          >
            People talk about a ‘protein’ alternative; what do you usually
            provide as the ‘protein’ alternative for vegan meals? Do you procure
            meat alternatives?
          </label>
          <input
            type="text"
            id="q14"
            name="q14"
            defaultValue={resortData?.environmentalQuestionSchema?.q14}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q15"
            className="block text-sm font-medium text-gray-700"
          >
            Do you need any help or advice for your plant-based
            preparation or menu?
          </label>
          <input
            type="text"
            id="q15"
            name="q15"
            defaultValue={resortData?.environmentalQuestionSchema?.q15}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="flex justify-between mt-10">
          {currentStep > 1 && (
            <button
              onClick={goToPrevStep}
              className="custom_red_color  px-10 py-3 text-white rounded-md font-semibold"
            >
              Previous
            </button>
          )}
          {currentStep < totalSteps ? (
            <button
              type="submit"
              className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold"
            >
              Next
            </button>
          ) : (
            <button
              disabled={submitLoader}
              type="submit"
              className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold"
            >
              {submitLoader ? <ClipLoader color="#ffff" /> : "Finish"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EnvQAndA;
