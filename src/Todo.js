import React from 'react';
import Button from '@material-ui/core/Button';

const server = 'http://localhost:8080/api/files/'

export class Todo extends React.Component {

	validateIsImage = fileUrl => {
		let url = fileUrl.toUpperCase();
		return url.endsWith("JPG") || url.endsWith("JPEG") || url.endsWith("GIF");
	}

	fileCell = () => {
		if(this.props.fileUrl != null){
			if(this.validateIsImage(this.props.fileUrl)){
				return <img src={server + this.props.fileUrl} alt=""/>
			} else if (this.props.fileUrl.toUpperCase().endsWith(".PDF")){
				return (
					<form method="get" action={server + this.props.fileUrl} target="_blank">
						<Button
                            type="submit"
                            variant="raised"
                            color="primary"
                            className="submit"
                            >
                                View PDF
                            </Button>
					</form>
				);
			}
		}
		return <h6>No file</h6>;
	}

    render() {
        return (
            <tr>
                <td>{this.props.description}</td>
                <td>{this.props.priority}</td>
                <td>{this.props.dueDate}</td>
				<td>{this.props.responsible}</td>
				<td>{this.props.status}</td>
				<td>{this.fileCell()}</td>
            </tr>
        );
    }
}
