import { Card, CardContent, Grid } from "@mui/material";
import React, { forwardRef } from "react";
import { useParams } from "react-router-dom";
import { Participant } from '../../types/index';

interface ResultsCardProps {
  participant: Participant;
}

function ResultsCard({ participant, ...props }: ResultsCardProps, ref: React.Ref<HTMLDivElement>) {
  const { contest: contestId }: { contest: string } = useParams();
  const getPlaceColor = (place?: number): string => {
    switch (place) {
      case 1:
        return "gold";
      case 2:
        return "lightgrey";
      default:
        return "";
    }
  };
  const getLipsynchersColor = (place?: number): string => {
    switch (place) {
      case 1:
      case 2:
        return "#ffe";
      default:
        return "";
    }
  };
  return (
    <Grid
      {...props}
      ref={ref}
      container
      className="Cards"
      key="participantsCards"
      justifyContent="left"
      direction="row"
    >
      <Grid
        item
        key={`grid-item-${participant.name}-place`}
        style={{ margin: 0 }}
        xs={1}
      >
        <Card
          key={`card-${participant.name}-place`}
          style={{
            margin: 8,
            marginLeft: 24,
            marginRight: 8,
            backgroundColor: getPlaceColor(participant.place),
          }}
        >
          <CardContent
            style={{ padding: 8, textAlign: "center", fontSize: "1.2rem" }}
          >
            {`${participant.place}º`}
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        key={`grid-item-${participant.name}-points`}
        style={{ margin: 0 }}
        xs={3}
      >
        <Card
          key={`card-${participant.name}-points`}
          style={{
            margin: 8,
            marginLeft: 8,
            marginRight: 8,
            backgroundColor: getLipsynchersColor(participant.place),
          }}
        >
          <CardContent
            style={{ padding: 8, textAlign: "center", fontSize: "1.2rem" }}
          >
            {`${participant.points} points`}
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        key={`grid-item-${participant.name}-name`}
        style={{ margin: 0 }}
        xs={8}
      >
        <Card
          key={`card-${participant.name}-name`}
          style={{
            margin: 8,
            marginLeft: 8,
            marginRight: 24,
            backgroundColor: getLipsynchersColor(participant.place),
          }}
        >
          <CardContent
            style={{ padding: 8, paddingLeft: "1rem", fontSize: "1.2rem" }}
          >
            {participant.name}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default forwardRef(ResultsCard);
