import React from 'react';
import {Media} from 'reactstrap';

function RenderLeader({leader}){
    return(
                <div className="row row-header">
                <Media className="mt-5">
                <Media left className="mr-5">
                  <Media object src={leader.image} alt={leader.name} />
                </Media>
                <Media body>
                  <Media heading>
                    {leader.name}
                  </Media>
                    {leader.designation}
                    <p>
                        {leader.description}
                    </p>
                </Media>
              </Media>
                </div>
    );

}

export default RenderLeader;