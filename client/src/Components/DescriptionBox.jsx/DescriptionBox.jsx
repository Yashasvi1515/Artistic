import React from "react";
import './DescriptionBox.css';

const DescriptionBox = ({product}) => { 
    return (
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="dis-nav-box">
                    Description
                </div>
                <div className="dis-nav-box fade">
                    Reviews {122}
                </div>
            </div>
            <div className="disbox-dis">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatibus incidunt aperiam dolore placeat dignissimos repellat ipsum molestiae qui fugit facilis quod odit, hic vitae animi. Sit quo delectus error dolor, voluptatibus odio cupiditate rem provident? Tenetur veritatis incidunt laborum, harum officia adipisci soluta quia, praesentium neque ullam error voluptatum! Alias, dicta optio velit magni atque illum deserunt dignissimos harum voluptatem tenetur tempore ab itaque vel iste architecto mollitia culpa. Ullam vero recusandae distinctio quo iste laborum inventore quae dolorum dicta adipisci, aspernatur iusto! Accusamus quam voluptatum odit atque quia est voluptates quos sunt, unde laboriosam mollitia beatae molestias illum?</p>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit officiis, voluptatem maxime laudantium provident recusandae, neque soluta perspiciatis natus tenetur obcaecati consequatur? Quidem esse, maiores iusto est illo, natus dolor nam molestias facere, dolorem aliquid ipsum odit quia tenetur aliquam cumque animi pariatur obcaecati perferendis quibusdam nemo sapiente voluptates atque!</p>
            </div>
        </div>
    );
}
export default DescriptionBox;