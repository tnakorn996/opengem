import React, { useContext, useEffect, useRef, useState } from "react";

import '../tab/index.css'
import { Context } from "../../context/Context";
import useSlice from "../../hook/useSplit";
import useApp from "../../hook/useApp";
import AuthForm from "../../page/auth/AuthForm";
import CardMain from "../../layout/card/CardMain";
import ZoomMain from "../zoom/ZoomMain";
// import FeedMain from "../../component/feed/FeedMain";
// import CardMain from "../card/CardMain";
// import ZoomMain from "../zoom/ZoomMain";
// import SignMain from "../../component/sign/SignMain.tsx";
// import { appul } from "../../content/content";

export default function TabMain({ 
    tabmainref, 
    tabmainstatic, 
    tabmainstyle 
}) {
  const { 
    tabmainstate, settabmainstate 

} = useContext(Context);
  const ref = useRef();

  const [tabmainrender, settabmainrender] = useState();

  useEffect(() => {
    settabmainstate({ tabmainindex: 0 });
  }, []);

  useEffect(() => {
    if (tabmainstatic) {
      const filter = tabmain.filter((data) => data.tabmainid === tabmainstatic.tabmainid);
      const array = [];
      const assign = Object.assign(...filter).tabmainref;
      for (let i = 0; i < assign.length; i++) {
        array.push({
          tabmaintitle: assign[i].tabmaintitle,
          tabmainindex: assign.indexOf(assign[i]),
        });
      }
      return settabmainrender(array);
    }
  }, [tabmainstatic]);

  useEffect(() => {
    if (tabmainstate && tabmainstate.tabmainindex === 0) {
      ref?.current?.scrollTo(0, 0);
    } else {
      ref?.current?.scrollTo(window.innerWidth * tabmainstate.tabmainindex, 0);
    }
  }, [tabmainstate, tabmainrender]);

  const authfieldset = [
    {
      tabmaintitle: "Sign Up",
      tabmainrender: () => {
        return appFieldsetRender({
          component: <AuthForm />
        });
      },
    },
    {
      tabmaintitle: "Sign In",
      tabmainrender: () => {
        return appFieldsetRender({
          component: <AuthForm />
        });
      },
    },
  ];

  const tabmain = [
    {
      tabmainid: "authfieldset",
      tabmainref: authfieldset,
    },
  ];

  const [appstatic, setappstatic] = useApp(
    tabmain,
    tabmainstatic.tabmainid,
    null
  );

  return (
    <div>
      <main className="">
        <section className="">
          <figcaption className="flex flex-row items-center">
            {tabmainrender?.map((data, index) => (<>
                <article
                  onClick={() => {
                    settabmainstate({ tabmainindex: index });
                  }}
                  className={`l-h4 border-b-[2.5px]  rounded-sm border-white dark:border-slate-800 duration-1000 ${data?.tabmainindex === tabmainstate?.tabmainindex &&"border-slate-700 dark:border-white text-black dark:text-white font-medium"}`}>
                  <CardMain>
                    <div className="flex flex-row gap-2">
                      {data.tabmaintitle}
                    </div>
                  </CardMain>
                </article>
              </>
            ))}
          </figcaption>
        </section>
        <section className="no-scrollbar border-t dark:border-t-slate-700">
          <figure ref={ref} className={`w-screen md:w-full grid grid-flow-col justify-start  overflow-x-scroll overflow-y-clip no-scrollbar snap-x snap-mandatory scroll-smooth duration-100 ${tabmainstyle && tabmainstyle}`}>
            {appstatic && appstatic.map((data) => data?.tabmainrender())}
          </figure>
        </section>
      </main>
    </div>
  );
}

// export function appFieldsetRender({ feedmainstatic, zoommainstatic }) {
//   return (
//     <div className="">
//       <section className="w-screen  snap-center overflow-hidden">
//         {feedmainstatic && <FeedMain feedmainstatic={feedmainstatic} />}
//         {zoommainstatic && <ZoomMain zoommainstatic={zoommainstatic} />}
//       </section>
//     </div>
//   );
// }


export function appFieldsetRender({  component}) {
  return (
    <div className="">
      <section className="w-screen  snap-center overflow-hidden">
        {component}
      </section>
    </div>
  );
}