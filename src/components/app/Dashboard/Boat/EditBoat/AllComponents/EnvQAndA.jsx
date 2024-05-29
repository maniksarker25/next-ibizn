import React from "react";

const EnvQAndA = ({ submitData, boatData, setBoatData, handleEnvChange }) => {
  return (
    <div>
      <h1 className="text-2xl text-center font-bold">
        Environmental Questions
      </h1>
      <form onSubmit={submitData}>
        <div className="mb-4">
          <label
            htmlFor="q1"
            className="block text-sm font-medium text-gray-700"
          >
            Which conservation organizations does the operation support? If any.
          </label>
          <input
            type="text"
            id="q1"
            name="q1"
            defaultValue={boatData?.environmentalQuestions?.q1 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            defaultValue={boatData?.environmentalQuestions?.q2 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            required
            name="q3"
            defaultValue={boatData?.environmentalQuestions?.q3 || ""}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            defaultValue={boatData?.environmentalQuestions?.q4 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            defaultValue={boatData?.environmentalQuestions?.q5 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            defaultValue={boatData?.environmentalQuestions?.q6 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            required
            name="q7"
            defaultValue={boatData?.environmentalQuestions?.q7 || ""}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            defaultValue={boatData?.environmentalQuestions?.q8 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            defaultValue={boatData?.environmentalQuestions?.q9 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            defaultValue={boatData?.environmentalQuestions?.q10 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            defaultValue={boatData?.environmentalQuestions?.q11 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            defaultValue={boatData?.environmentalQuestions?.q12 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            defaultValue={boatData?.environmentalQuestions?.q13 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            defaultValue={boatData?.environmentalQuestions?.q14 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            defaultValue={boatData?.environmentalQuestions?.q15 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default EnvQAndA;
