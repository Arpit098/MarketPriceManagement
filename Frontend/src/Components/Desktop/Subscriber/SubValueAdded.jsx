import { CirclePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccessstories } from "../../../store/API/Successstories";
import { fetchCollection } from "../../../store/API/Collection";
import { fetchWeatherUpdate } from "../../../store/API/WeatherUpdate";
import { fetchLiveProgram } from "../../../store/API/LiveProgram";
import AddCollection from "./subscriberComponents/AddCollection";
import SubscriberQuestions from "./ValueAddedTabs/Q&A";

const SubValueAdded = () => {
  const [activeTab, setActiveTab] = useState("Success Stories");
  const [addCollection, setAddCollection] = useState(false);

  const basicServicesData = [
    { id: "Success Stories", label: "Success Stories" },
    { id: "Collection", label: "Collection" },
    { id: "Weather Updates", label: "Weather Updates" },
    { id: "Live Programs", label: "Live Programs" },
    { id: "Weekly Consultation", label: "Weekly Consultation" },
    { id: "Question & Answers", label: "Question & Answers" },
    { id: "Reward", label: "Reward" },
    { id: "Subject Updates", label: "Subject Updates" },
    { id: "Crop Updates", label: "Crop Updates" },
  ];

  const tableFields = {
    weeklyConsultationFields: [
      "Date",
      "Unique ID",
      "Date of Weekly Consultation",
      "Time",
      "Conducted By",
      "Category",
      "Subject",
      "Program Link",
      "Conducted (Yes / No)",
      "If not Why",
      "Number of Participants",
      "Subscriber Feedback & Review",
      "Your Feedback",
      "Our Feedback & Review",
    ],
    liveProgramFields: [
      "Date",
      "Unique ID",
      "Date of Program",
      "Time",
      "Conducted By",
      "Category",
      "Subject",
      "Program Link",
      "Conducted (Yes / No)",
      "If not Why",
      "Number of Participants",
      "Subscriber Feedback",
      "Your Feedback",
      "Our Feedback",
    ],
    weatherUpdateFields: [
      "Date",
      "Unique ID",
      "Name of Subscriber",
      "City / Village",
      "Conducted By",
      "Category",
      "Subject",
      "Question",
      "Answer",
      "Number of Participants",
      "Subscriber Feedback & Review",
      "Your Feedback",
      "Our Feedback & Review",
    ],
    successStoriesFields: [
      "Date",
      "Unique ID",
      "Name of Consultant",
      "Category",
      "Subject",
      "Success Story (Video / PDF / JPEG)",
    ],
    collectionFields: [
      "Date",
      "Unique ID",
      "Name of Subscriber",
      "City / Village",
      "Approved by Consultant",
      "Category",
      "Subject",
      "Collection (Video / PDF / JPEG)",
    ],
    rewardFields: [
      "Date",
      "Unique ID",
      "Name of Subscriber",
      "City / Village",
      "Approved by Consultant",
      "Category",
      "Subject",
      "Reward Type",
      "Reward Description",
      "Reward Status",
    ],
    subjectUpdatesFields: [
      "View only",
      "Date",
      "Unique ID",
      "Name of Consultant",
      "Category",
      "Subject",
      "Subject Updates (Video / PDF / JPEG)",
    ],
    cropUpdatesFields: [
      "View only",
      "Date",
      "Unique ID",
      "Name of Consultant",
      "Category",
      "Subject",
      "Subject Updates (Video / PDF / JPEG)",
    ],
    questionAnswerFields: [
      "Date",
      "Unique ID",
      "Name of Subscriber",
      "City / Village",
      "Conducted By",
      "Category",
      "Subject",
      "Question",
      "Answer",
      "Number of Participants",
      "Subscriber Feedback & Review",
      "Your Feedback",
      "Our Feedback & Review",
    ],
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSuccessstories());
    dispatch(fetchCollection());
    dispatch(fetchWeatherUpdate());
    dispatch(fetchLiveProgram());
  }, [dispatch]);

  const { SuccessstoriesData } = useSelector((state) => state.GetSuccessstories);
  const { CollectionData } = useSelector((state) => state.GetCollection);
  const { WeatherUpdateData } = useSelector((state) => state.GetWeatherUpdate);
  const { LiveProgramData } = useSelector((state) => state.GetLiveProgram);

  return (
    <div>
      <h2 className="text-[40px] font-medium">Value Added Services</h2>

      <div className="mt-5">
        <div className="flex border-b">
          {basicServicesData.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 text-[14px] font-medium ${
                activeTab === tab.id
                  ? "border-b-2 border-[#4880FF] text-[#4880FF]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {activeTab === "Success Stories" && (
            <div>
              <h3 className="text-[24px] font-semibold mb-4">Success Stories</h3>
              <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      {tableFields.successStoriesFields.map((header, index) => (
                        <th
                          key={index}
                          className="px-4 py-2 text-sm font-medium text-gray-700 border-b"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SuccessstoriesData?.map((detail, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                      >
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.title}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">test-data</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">test-data</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">test-data</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">test-data</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Collection" && (
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-[24px] font-semibold mb-4">Collection</h3>
                <button
                  onClick={() => setAddCollection((prev) => !prev)}
                  className="flex items-center px-3 py-2 bg-[#4880FF] text-white rounded-md hover:bg-blue-700"
                >
                  <CirclePlus className="w-5 h-5 mr-2" />
                  Add Collection
                </button>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      {tableFields.collectionFields.map((header, index) => (
                        <th
                          key={index}
                          className="px-4 py-2 text-sm font-medium text-gray-700 border-b"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CollectionData?.map((detail, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                      >
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.title}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem, ipsum dolor.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem, ipsum dolor.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem, ipsum dolor.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem, ipsum dolor.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem, ipsum dolor.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem, ipsum dolor.</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <AddCollection
                addCollectionIsActive={addCollection}
                setAddCollection={setAddCollection}
              />
            </div>
          )}

          {activeTab === "Weather Updates" && (
            <div>
              <h3 className="text-[24px] font-semibold mb-4">Weather Updates</h3>
              <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      {tableFields.weatherUpdateFields.map((header, index) => (
                        <th
                          key={index}
                          className="px-4 py-2 text-sm font-medium text-gray-700 border-b"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {WeatherUpdateData?.map((detail, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                      >
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.title}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">text-data</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">text-data</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">text-data</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">text-data</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">text-data</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">text-data</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">text-data</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">text-data</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">text-data</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">text-data</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">text-data</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Live Programs" && (
            <div>
              <h3 className="text-[24px] font-semibold mb-4">Live Programs</h3>
              <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      {tableFields.liveProgramFields.map((header, index) => (
                        <th
                          key={index}
                          className="px-4 py-2 text-sm font-medium text-gray-700 border-b"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {LiveProgramData?.map((detail, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                      >
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.title}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">
                          <a href={detail?.link} className="text-blue-500 hover:underline">
                            Link of Program
                          </a>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">
                          {detail?.created_at
                            ? new Date(detail.created_at).toLocaleDateString("en-US")
                            : ""}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">
                          {detail?.created_at
                            ? new Date(detail.created_at).toLocaleDateString("en-US")
                            : ""}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">
                          {detail?.created_at
                            ? new Date(detail.created_at).toLocaleDateString("en-US")
                            : ""}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">
                          {detail?.created_at
                            ? new Date(detail.created_at).toLocaleDateString("en-US")
                            : ""}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">
                          {detail?.created_at
                            ? new Date(detail.created_at).toLocaleDateString("en-US")
                            : ""}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">
                          {detail?.created_at
                            ? new Date(detail.created_at).toLocaleDateString("en-US")
                            : ""}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">
                          {detail?.created_at
                            ? new Date(detail.created_at).toLocaleDateString("en-US")
                            : ""}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">
                          {detail?.created_at
                            ? new Date(detail.created_at).toLocaleDateString("en-US")
                            : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Weekly Consultation" && (
            <div>
              <h3 className="text-[24px] font-semibold mb-4">Weekly Consultation</h3>
              <p>API IS PENDING</p>
              <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      {tableFields.weeklyConsultationFields.map((header, index) => (
                        <th
                          key={index}
                          className="px-4 py-2 text-sm font-medium text-gray-700 border-b"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {LiveProgramData?.map((detail, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                      >
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.title}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">
                          <a href={detail?.link} className="text-blue-500 hover:underline">
                            Link of Program
                          </a>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">
                          {detail?.created_at
                            ? new Date(detail.created_at).toLocaleDateString("en-US")
                            : ""}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor, sit</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor, sit</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor, sit</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor, sit</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor, sit</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor, sit</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor, sit</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor, sit</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor, sit</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor, sit</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Question & Answers" && (
           <SubscriberQuestions/>
          )}

          {activeTab === "Reward" && (
            <div>
              <h3 className="text-[24px] font-semibold mb-4">Reward</h3>
              <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      {tableFields.rewardFields.map((header, index) => (
                        <th
                          key={index}
                          className="px-4 py-2 text-sm font-medium text-gray-700 border-b"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {LiveProgramData?.map((detail, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                      >
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.title}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.link}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor sit amet.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor sit amet.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor sit amet.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor sit amet.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor sit amet.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor sit amet.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor sit amet.</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Subject Updates" && (
            <div>
              <h3 className="text-[24px] font-semibold mb-4">Subject Updates</h3>
              <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      {tableFields.subjectUpdatesFields.map((header, index) => (
                        <th
                          key={index}
                          className="px-4 py-2 text-sm font-medium text-gray-700 border-b"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {LiveProgramData?.map((detail, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                      >
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.title}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.link}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor sit amet.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor sit amet.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor sit amet.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor sit amet.</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Crop Updates" && (
            <div>
              <h3 className="text-[24px] font-semibold mb-4">Crop Updates</h3>
              <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      {tableFields.cropUpdatesFields.map((header, index) => (
                        <th
                          key={index}
                          className="px-4 py-2 text-sm font-medium text-gray-700 border-b"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {LiveProgramData?.map((detail, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                      >
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.title}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">{detail?.link}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor sit amet.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor sit amet.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor sit amet.</td>
                        <td className="px-4 py-2 text-sm text-gray-600 border-b">Lorem ipsum dolor sit amet.</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubValueAdded;