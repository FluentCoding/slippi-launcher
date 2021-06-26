/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";

import { DualPane } from "@/components/DualPane";
import { Footer } from "@/components/Footer";
import { getCharacterCssIcon } from "@/lib/utils";

const Outer = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  position: relative;
  min-width: 0;
`;

const characters: Character[] = [
  {
    name: "Dr. Mario",
    iconUrl: getCharacterCssIcon(22),
  },
  {
    name: "Mario",
    iconUrl: getCharacterCssIcon(8),
  },
  {
    name: "Luigi",
    iconUrl: getCharacterCssIcon(7),
  },
  {
    name: "Bowser",
    iconUrl: getCharacterCssIcon(5),
  },
  {
    name: "Peach",
    iconUrl: getCharacterCssIcon(12),
  },
  {
    name: "Yoshi",
    iconUrl: getCharacterCssIcon(17),
  },
  {
    name: "Donkey Kong",
    iconUrl: getCharacterCssIcon(1),
  },
  {
    name: "Captain Falcon",
    iconUrl: getCharacterCssIcon(0),
  },
  {
    name: "Ganondorf",
    iconUrl: getCharacterCssIcon(25),
  },
  {
    name: "Falco",
    iconUrl: getCharacterCssIcon(20),
  },
  {
    name: "Fox",
    iconUrl: getCharacterCssIcon(2),
  },
  {
    name: "Ness",
    iconUrl: getCharacterCssIcon(11),
  },
  {
    name: "Ice Climbers",
    iconUrl: getCharacterCssIcon(14),
  },
  {
    name: "Kirby",
    iconUrl: getCharacterCssIcon(4),
  },
  {
    name: "Samus",
    iconUrl: getCharacterCssIcon(16),
  },
  {
    name: "Zelda",
    iconUrl: getCharacterCssIcon(18),
  },
  {
    name: "Sheik",
    iconUrl: getCharacterCssIcon(19),
  },
  {
    name: "Link",
    iconUrl: getCharacterCssIcon(6),
  },
  {
    name: "Young Link",
    iconUrl: getCharacterCssIcon(21),
  },
  {
    name: "Pichu",
    iconUrl: getCharacterCssIcon(24),
  },
  {
    name: "Pikachu",
    iconUrl: getCharacterCssIcon(13),
  },
  {
    name: "Jigglypuff",
    iconUrl: getCharacterCssIcon(15),
  },
  {
    name: "Mewtwo",
    iconUrl: getCharacterCssIcon(10),
  },
  {
    name: "Mr. Game & Watch",
    iconUrl: getCharacterCssIcon(3),
  },
  {
    name: "Marth",
    iconUrl: getCharacterCssIcon(9),
  },
  {
    name: "Roy",
    iconUrl: getCharacterCssIcon(23),
  },
];

export interface Character {
  name: string;
  iconUrl: string;
}

export interface SelectableCharacterProps {
  character: Character;
}

export const CharacterLab: React.FC = () => {
  const [character, setCharacter] = React.useState<Character | undefined>(undefined);

  const SelectableCharacter: React.FC<SelectableCharacterProps> = (props) => {
    return (
      <img
        css={css`
          cursor: pointer;
          margin-right: 10px;
          margin-bottom: 5px;
          width: 96px;
          height: 84px;
        `}
        onClick={() => {
          if (!character) {
            setCharacter(props.character);
          } else {
            setCharacter(undefined);
          }
        }}
        src={props.character.iconUrl}
      />
    );
  };

  return (
    <Outer>
      <div
        css={css`
          display: flex;
          flex: 1;
          position: relative;
          overflow: hidden;
        `}
      >
        <DualPane
          id="console-mirror-page"
          leftSide={
            <div
              css={css`
                padding-right: 10px;
                padding-left: 20px;
                flex: 1;
              `}
            >
              <h1>Character Lab</h1>
              {characters.map((character) => (
                <Tooltip key={character.name} title={character.name}>
                  <div
                    css={css`
                      display: inline-block;
                    `}
                  >
                    <SelectableCharacter character={character} />
                  </div>
                </Tooltip>
              ))}
            </div>
          }
          rightSide={<div></div>}
          style={{ gridTemplateColumns: "auto 400px" }}
        />
      </div>
      <Footer />
    </Outer>
  );
};
