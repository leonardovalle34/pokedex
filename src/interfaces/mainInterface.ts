export default interface IMainRequest {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export default interface IPokemon {
  name: string;
  url: string;
}

export default interface IModal {
  onClose: () => void;
  pokeParams: {
    name: string;
    sprites: {
      front_default: string;
    };
    species: {
      name: string;
    };
    types: {
      type: {
        name: string;
      };
    }[];
  };
}
