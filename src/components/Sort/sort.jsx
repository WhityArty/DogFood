import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useTranslation } from "react-i18next";
import { CardContext } from "../../context/cardContext";
import "./index.scss";

const Sort = () => {
  const { onSortData } = useContext(CardContext);
  const [sortedId, setSortedId] = useState('newest');

  const { t } = useTranslation();

  const res = t("newest");
  console.log({ res });

  const tabs = [
    { id: "newest", title: t("newest") },
    { id: "cheep", title: t("cheep")},
    { id: "expensive", title: t("expensive")},
    { id: "popular", title: t("popular") },
  ];

  const handleChange = (e, id) => {
    e.preventDefault();
    onSortData(id);
    setSortedId(id);
  };

  return (
    <div className="sort">
      {tabs.map((tab) => (
        <div key={tab.id}>
          <span
            className={`sort__link ${
              tab.id === sortedId ? "sort__link_selected" : ""
            } `}
            onClick={(e) => handleChange(e, tab.id)}
          >
            {tab.title}
            {/* {t(tab.id)} */}
          </span>
          {/* <span className='sort inner'></span> */}
        </div>
      ))}
    </div>
  );
};


export default Sort;
