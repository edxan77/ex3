import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [val, setval] = useState("");
  const [getValue, setgetValue] = useState([]);
  const [page, setpage] = useState(0);
  const [fakeval, setfakeval] = useState("");
  const [classname, setclassname] = useState("");
  const [found, setfound] = useState("");

  useEffect(
    function () {
      if (getValue.length == 0) {
        setclassname("pageing");
      }
      if (getValue.length > 0) {
        setclassname("pageingOn");
      }
    },
    [getValue]
  );

  const getVal = function (e) {
    setval(e.target.value.replace(/ /gi, "+"));
    setfakeval(e.target.value);
  };
  const clickGetval = function () {
    setgetValue([]);
    fetch(`http://openlibrary.org/search.json?q=${val}&page=1`)
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        setgetValue(json.docs);
        setfound(json.numFound);
      });
    setfakeval("");
  };

  const pageing = function (e) {
    setpage(e.target.value);
  };

  const nextpage = function () {
    setgetValue([]);
    fetch(`http://openlibrary.org/search.json?q=${val}&page=${page}`)
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        setgetValue(json.docs);
      });
  };
  console.log(val);
  console.log(getValue);

  return (
    <div className="App">
      <input type="text" value={fakeval} onInput={getVal}></input>
      <button onClick={clickGetval}>Search</button>
      <div className={classname}>
        {found} Books in {Math.ceil(found / 100)}Pages
      </div>

      <ul className="mainlistt">
        {getValue.map(function (item) {
          if ("author_name" && "first_publish_year" in item) {
            return (
              <div key={Math.random()} className="mainlist">
                <li className="title" key={Math.random()}>
                  title:{item.title}
                </li>
                <li className="autor" key={Math.random()}>
                  {"author_name" in item
                    ? item.author_name[0]
                    : "unknown Autor"}
                </li>
                <li className="date" key={Math.random()}>
                  {"first_publish_year" in item
                    ? item.first_publish_year
                    : "unknown Publish Yaear"}
                </li>
              </div>
            );
          }
        })}
      </ul>
      <input type="number" onInput={pageing} className={classname}></input>
      <span className={classname}>of{Math.ceil(found / 100)}</span>
      <button onClick={nextpage} className={classname}>
        set page
      </button>
    </div>
  );
}

export default App;
