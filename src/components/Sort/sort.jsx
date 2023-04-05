import { memo, useContext, useMemo, useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import "./index.scss";

const Sort = () => {
  const { onSortData } = useContext(CardContext);
  const { isMobileView } = useContext(UserContext);

  const [sortedId, setSortedId] = useState(localStorage.getItem('sort') ?? 'newest');

  const { t } = useTranslation();

  const tabs = useMemo(() => [
    { id: "newest", title: t("newest") },
    { id: "cheep", title: t("cheep")},
    { id: "expensive", title: t("expensive")},
    { id: "popular", title: t("popular") },
  ], [t]);

  const selectTabs = useMemo(() => tabs.map((e) => ({
    value: e.id,
    label: e.title
  })), [tabs])

  const handleSelectChange = (value) => {
    console.log(`selected ${value}`);
    onSortData(value);
    setSortedId(value);
    localStorage.setItem('sort', value);
  };

  const handleChange = (e, id) => {
    e.preventDefault();
    onSortData(id);
    setSortedId(id);
    localStorage.setItem('sort', id);
  };

  return ( <>
    {isMobileView ? <><Select
      defaultValue="lucy"
      className="sort__select"
      onChange={handleSelectChange}
      options={selectTabs}
    />

    <select name="select" id="">
        {tabs.map((e) => (<option>{e.id}</option>))}
      </select></> :
      <div className="sort">
        {tabs.map((tab) => (
          <div key={tab.id}>
            <span
              className={`sort__link ${tab.id === sortedId ? "sort__link_selected" : ""
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
    }
  </>
  );
};


export default Sort;
