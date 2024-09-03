import { FunctionComponent, Suspense } from "react";

/**
 * Una funzione che prende in input un functional Component che accetta come prop un oggetto di tipot T
 * che estende l`interfaccia React.JSX.IntrinsicAttributes e restituisce un nuovo functional Component che wrappa
 * il componente passato come parametro all`interno di un componente Suspense con fallback di default "Loading..."
 */
export default function LazyLoad<T extends React.JSX.IntrinsicAttributes>(
  LoadableComponent: FunctionComponent<T>
): (props: T) => JSX.Element {
  return (props: T) => (
    <Suspense fallback={<div>Loading...</div>}>
      <LoadableComponent {...props}></LoadableComponent>
    </Suspense>
  );
}
