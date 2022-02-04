import { useContext } from "react";
import CardWrapper from "./Components/Card/Card";
import styles from "./App.module.css";
import { Context } from "./Context";
export default function App(): JSX.Element {
  const { state, uniqueId } = useContext(Context);
  return (
    <div className={styles.wrapper}>
      {state.map((item) => {
        return (
          <CardWrapper
            header={item.header}
            key={item.id}
            items={item.items}
            boards={item}
          />
        );
      })}
    </div>
  );
}
